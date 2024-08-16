const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
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

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// List all users
const listUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    listUsers,
};
