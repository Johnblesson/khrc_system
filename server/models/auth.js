import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // maxLength: 6,
    },
    username: {
        type: String,
        required: true,
        // maxLength: 6,
    },
    password: {
        type: String,
        required: true,
        // maxLength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // You can adjust the enum values as needed
    },
    sudo: {
        type: Boolean,
        default: false, // Set sudo to false by default
    },
    creator: {
        type: Boolean,
        default: false, // Set creator to false by default
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
});

const User = mongoose.model('users', userSchema);

export default User;
