const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Invalid email address'
            ]
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user', 'client', 'unknown']
        },
        ipAddress: {
            type: String,
            validate: {
                validator: function (v) {
                    return (
                        /^(\d{1,3}\.){3}\d{1,3}$/.test(v) ||
                        /^([a-fA-F0-9:]+:+)+[a-fA-F0-9]+$/.test(v)
                    );
                },
                message: 'Invalid IP address'
            }
        },
        success: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);
loginLogSchema.index({ email: 1 });
loginLogSchema.index({ user: 1 });
loginLogSchema.index({ createdAt: -1 });

const LoginLog = mongoose.model('LoginLog', loginLogSchema);

module.exports = LoginLog;
