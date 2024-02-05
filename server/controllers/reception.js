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
        sampleQuality: req.body.sampleQuality,
        rejectionReason: req.body.rejectionReason,
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
        sampleId: req.body.sampleId,
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

export const editPost = async (req, res) => {
  try {
    await Reception.findByIdAndUpdate(req.params.id, {
      studyName: req.body.studyName,
      sampleId: req.body.sampleId,
      visitName: req.body.visitName,
      visitDate: req.body.visitDate,
      sampleType: req.body.sampleType,
      sampleQuality: req.body.sampleQuality,
      ageAtVisit: req.body.ageAtVisit,
      dateSampleCollection: req.body.dateSampleCollection,
      timeOfSampleCollection: req.body.timeOfSampleCollection,
      dateOfSampleReceipt: req.body.dateOfSampleReceipt,
      timeOfSampleReceipt: req.body.timeOfSampleReceipt,
      comments: req.body.comments,
      dateOfEntry: req.body.dateOfEntry,
      entryDoneBy: req.body.entryDoneBy,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    res.redirect(`/edit/${req.params.id}`);
    console.log("redirected");
  } catch (error) {
    console.error(error);
  }
};

/**
 * Delete /
 * Delete Reception Data
 */
export const deleteReception = async (req, res) => {
  try {
    await Reception.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get /
 * Search Reception Data
 */
export const searchReceptions = async (req, res) => {
  const locals = {
    title: "Search Reception Data",
    description: "Free NodeJs User Management System",
  };

  try {
    const searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const receptions = await Reception.find({
      $or: [
        { studyName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { sampleId: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      receptions,
      locals,
    });
  } catch (error) {
    console.error(error);
  }
};
