import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    msg: { type: String, required: true }
});

const Contact = mongoose.model('contactUs', usersSchema);

export default Contact;