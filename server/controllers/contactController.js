import Contact from '../models/contactModel.js';

export const createMessage = async (req, res) => {
    try {
        const newMessage = await Contact.create(req.body);
        res.render('index', { message: 'Your message has been sent successfully!' })
        // res.status(201).json({
        //     status: 'success',
        //     data: {
        //         newMessage
        //     }
        // })
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

// Get all contact forms
export const getAllContactForms = async (req, res) => {
    try {
        const contactForms = await Contact.find();
        res.status(200).json({
            status: 'success',
            results: contactForms.length,
            data: {
                contactForms
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}