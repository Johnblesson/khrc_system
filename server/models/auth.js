import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        // maxLength: 6,
    },
    username: {
        type: String,
        require: true,
        // maxLength: 6,
    },
    password: {
        type: String,
        require: true,
        // maxLength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Restrict the role to 'admin' or 'user'
        default: 'user', // Default role is 'user'
    },
})

const User = mongoose.model('users', userSchema)

export default User;