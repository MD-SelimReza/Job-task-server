const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    profilePicture: {
        type: String,
        required: [true, 'Profile picture is required'],
    },
});

module.exports = mongoose.model('User', userSchema);
