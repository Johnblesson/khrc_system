import Contact from '../models/contactModel.js';

export const createMessage = async (req, res) => {
    try {
        const newMessage = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            msg: req.body.msg
        });

        const savedContact = await newMessage.save();
        res.status(201).render('message-success', { message: 'Your message has been sent successfully!' })
        //   res.status(201).json({
        //     status: 'success',
        //     data: {
        //         savedContact
        //     }
        // })
    console.log(savedContact);

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

// Get one contact form by ID
// export const messagesRoute = async (req, res) => {

//     const locals = {
//         title: "KHRC",
//         description: "Kambia Health Research Center KHRC System",
//       };

//     try {
  
//       const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
//       const limit = 3; // Number of entries per page
//       const skip = (page - 1) * limit;
  
//       // Fetch all storage data
//     //   const { messages } = await getAllContactForms(req, res);

//       const allStorage = await Contact.find().skip(skip).limit(limit);
//       const totalEntries = await Contact.countDocuments();
  
//       const totalPages = Math.ceil(totalEntries / limit);
//     //   const allStorage = await Contact.find();
  
//       // Fetch the most recent storage data
//       const latestStorage = await Contact.findOne().sort({ _id: -1 });
  
//      res.render('message', { 
//       allStorage, 
//       latestStorage,
//       locals, 
//       currentPage: page, 
//       totalPages: totalPages,
//   })
//     } catch (error) {
//       return res.status(500).json({
//         message: error,
//       });
//     }
//   };

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

export const messagesRoute = async (req, res) => {
    const locals = {
      title: "KHRC",
      description: "Kambia Health Research Center KHRC System",
    };
  
    try {
      const allMessages = await getAllContactForms(req, res);
  
      // Render the messages page with the contact forms data
      res.render('message', { 
          allMessages, 
          locals,
      });
    } catch (error) {
      console.error('Error rendering the messages page:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  




  