const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        return jwt.sign(
            { id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '30d',
            }
        );
    } catch (error) {
        console.error('JWT Generation Error:', error.message);
        throw new Error('Token generation failed');
    }
};

module.exports = generateToken;
