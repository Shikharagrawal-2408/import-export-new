const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');
const LoginLog = require('../models/LoginLog');
const generateToken = require('../utils/generateToken');
const { protect, admin } = require('../middleware/authMiddleware');

/* ======================
   Email Transport
====================== */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/* ======================
   REGISTER
   POST /api/auth/register
====================== */
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role = 'user' } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================
   LOGIN
   POST /api/auth/login
====================== */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const ipAddress =
        req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            await LoginLog.create({
                email,
                role: 'unknown',
                ipAddress,
                success: false
            });
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: 'Account is blocked. Contact admin.'
            });
        }

        await LoginLog.create({
            user: user._id,
            email: user.email,
            role: user.role,
            ipAddress,
            success: true
        });

        transporter.sendMail({
            from: `"Trade Portal Security" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Login Alert (${user.role.toUpperCase()})`,
            html: `
                <h3>Login Alert</h3>
                <p><b>User:</b> ${user.name}</p>
                <p><b>Email:</b> ${user.email}</p>
                <p><b>IP:</b> ${ipAddress}</p>
                <p><b>Time:</b> ${new Date().toLocaleString()}</p>
            `
        }).catch(() => {});

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================
   GET ALL USERS (ADMIN)
   GET /api/auth/users
====================== */
router.get('/users', protect, admin, async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

/* ======================
   TOGGLE USER STATUS
   PUT /api/auth/users/:id/toggle
====================== */
router.put('/users/:id/toggle', protect, admin, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin')
        return res.status(400).json({ message: 'Cannot block admin' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: 'User status updated', isActive: user.isActive });
});

/* ======================
   DELETE USER (ADMIN ONLY)
   DELETE /api/auth/users/:id
====================== */
router.delete('/users/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Safety: Prevent deleting self
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================
   FORGOT PASSWORD
   POST /api/auth/forgotpassword
====================== */
router.post('/forgotpassword', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    await transporter.sendMail({
        to: user.email,
        from: `"Trade Portal Support" <${process.env.EMAIL_USER}>`,
        subject: 'Password Reset',
        html: `<p>Reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
    });

    res.json({ success: true, message: 'Reset email sent' });
});

/* ======================
   RESET PASSWORD
   PUT /api/auth/resetpassword/:token
====================== */
router.put('/resetpassword/:token', async (req, res) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid token' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ success: true, message: 'Password reset successful' });
});

module.exports = router;
