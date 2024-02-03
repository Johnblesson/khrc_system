import RECEPTION from '../models/reception.js';
import dotenv from 'dotenv';
dotenv.config();

// Create RECEPTION
export const createStorage = async (req, res) => {
  try {
    const newStorage = new RECEPTION({
        studyName: req.body.studyName,
        subject: req.body.subject,
        visitName: req.body.visitName,
        visitDate: req.body.visitDate,
        sampleType: req.body.sampleType,
        ageAtVisit: req.body.ageAtVisit,
        dateSampleCollection: req.body.dateSampleCollection,
        timeOfSampleCollection: req.body.timeOfSampleCollection,
        dateOfSampleReceipt: req.body.dateOfSampleReceipt,
        timeOfSampleReceipt: req.body.timeOfSampleReceipt,
        comments: req.body.comments,
        dateOfEntry: req.body.dateOfEntry,
        entryDoneBy: req.body.entryDoneBy,
        // user_id: req.body.user_id,
        });
    // const newStorage = await RECEPTION.create(req.body);

    const savedStorage = await newStorage.save();
    res.status(201).render('user-success');
    
    // res.json({ message: "Storage created successfully", savedStorage})
    // res.status(201).json(savedStorage);
    console.log(savedStorage);

  } catch (error) {
    return res.status(500).json({
      message: error,
  });
}
}

// Get Cross-sectional Survey-RECEPTION
export const getStorage = async (req, res) => {
  try {
   const receptions = await RECEPTION.find();
   res.status(200).json({ receptions
// //     // status: 'success',
// //     // results: newsletters.length,
// //     // data: {
// //     //     storage
// //     // }
})
  
} catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};


// Create Admin RECEPTION
export const createAdminReception = async (req, res) => {
  try {
    const newStorage = new RECEPTION({
        studyName: req.body.studyName,
        subject: req.body.subject,
        visitName: req.body.visitName,
        visitDate: req.body.visitDate,
        sampleType: req.body.sampleType,
        ageAtVisit: req.body.ageAtVisit,
        dateSampleCollection: req.body.dateSampleCollection,
        timeOfSampleCollection: req.body.timeOfSampleCollection,
        dateOfSampleReceipt: req.body.dateOfSampleReceipt,
        timeOfSampleReceipt: req.body.timeOfSampleReceipt,
        comments: req.body.comments,
        dateOfEntry: req.body.dateOfEntry,
        entryDoneBy: req.body.entryDoneBy,
        // user_id: req.body.user_id,
        });
    // const newStorage = await RECEPTION.create(req.body);

    const savedStorage = await newStorage.save();
    res.status(201).render('admin-success');
  
    // res.json({ message: "Storage created successfully", savedStorage})
    // res.status(201).json(savedStorage);
    console.log(savedStorage);

  } catch (error) {
    return res.status(500).json({
      message: error,
  });
}
}

// // Get Admin RECEPTION
// export const getReception = async (req, res) => {
//   try {
//    const storage = await RECEPTION.find();
//    res.status(200).json({ storage
//     // status: 'success',
//     // results: newsletters.length,
//     // data: {
//     //     storage
//     // }
// })
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };