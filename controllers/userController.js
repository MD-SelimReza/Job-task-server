const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, profilePicture } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Save user to the database
        const newUser = new User({
            name,
            email,
            profilePicture,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {
    registerUser,
};
