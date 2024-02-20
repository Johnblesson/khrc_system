import RECEPTION from '../models/reception.js';
import User from '../models/auth.js';
import dotenv from 'dotenv';
dotenv.config();

// Create RECEPTION
export const createStorage = async (req, res) => {
  try {

     // Append 'A' to the sampleId
    //  const sampleIdWithA = req.body.sampleId + 'A';
    //  const sampleIdWithB = req.body.sampleId + 'B';

    const newStorage = new RECEPTION({
        studyName: req.body.studyName,
        sampleId: req.body.sampleId,
        // sampleIdA: sampleIdWithA,
        // sampleIdB: sampleIdWithB,
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
        user_id: req.body.user_id,
        });
    // const newStorage = await RECEPTION.create(req.body);

    const savedStorage = await newStorage.save();
    res.status(201).render('user-success', savedStorage);
    
    // res.json({ message: "Storage created successfully", savedStorage})
    // res.status(201).json(savedStorage);
    console.log(savedStorage);

  } catch (error) {
    return res.status(500).json({
      message: error,
  });
}
}


// Get receptions data
export const getReception = async () => {
  try {
    const username = await User.find();
    return username;
  } catch (error) {
    throw error;
  }
};

// User Home Page
export const homeRoute = async (req, res) => {
  const locals = {
    title: "KHRC",
    description: "Kambia Health Research Center KHRC System",
  };

  // Function to determine the time of the day
const getTimeOfDay = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

  try {
    // Call getReception to fetch receptions data
    const { receptions } = await getReception(req, res);

     // Fetch all storage data
     const allStorage = await RECEPTION.find();

    // Fetch the most recent storage data
    const latestStorage = await RECEPTION.findOne().sort({ _id: -1 });

    const user = req.isAuthenticated() ? req.user : null;

     // Determine the time of the day
    const greeting = getTimeOfDay();

    // Render the index page with the receptions and latestStorage data
    res.render('index', { data: receptions, allStorage, latestStorage, locals, user, greeting});
  } catch (error) {
    console.error('Error rendering the page:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Admin Home Page
export const adminHomeRoute = async (req, res) => {

  const locals = {
    title: "KHRC",
    description: "Kambia Health Research Center KHRC System",
  };

    // Function to determine the time of the day
const getTimeOfDay = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

  try {
    // Call getReception to fetch receptions data
    const { receptions } = await getReception(req, res);

    // Fetch all storage data
    const allStorage = await RECEPTION.find();

     // Fetch the most recent storage data
     const latestStorage = await RECEPTION.findOne().sort({ _id: -1 });

     const user = req.isAuthenticated() ? req.user : null;

    // Determine the time of the day
    const greeting = getTimeOfDay();

    // Render the index page with the receptions data
    res.render('index-admin', { data: receptions, allStorage, latestStorage, locals, user, greeting});
  } catch (error) {
    console.error('Error rendering the page:', error);
    res.status(500).send('Internal Server Error');
  }
};

// View reception data
export const viewReception = async (req, res) => {
  const locals = {
    title: "KHRC",
    description: "Kambia Health Research Center KHRC System",
  };

  try {
    // Call getReception to fetch receptions data
    const { receptions } = await getReception(req, res);

    const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
    const limit = 2; // Number of entries per page
    const skip = (page - 1) * limit;

    // Fetch all storage data
    // const allStorage = await RECEPTION.find();
    const allStorage = await RECEPTION.find().skip(skip).limit(limit);
    const totalEntries = await RECEPTION.countDocuments();

    const totalPages = Math.ceil(totalEntries / limit);

    // Fetch the most recent storage data
    const latestStorage = await RECEPTION.findOne().sort({ _id: -1 });

    // Render the index page with the receptions data
    res.render('viewReception', { 
      data: receptions, 
      allStorage, 
      latestStorage,
      currentPage: page, 
      totalPages: totalPages,
      locals 
    });
  } catch (error) {
    console.error('Error rendering the page:', error);
    res.status(500).send('Internal Server Error');
  }
};

// View admin reception data
export const adminViewReception = async (req, res) => {
  const locals = {
    title: "KHRC",
    description: "Kambia Health Research Center KHRC System",
  };

  try {
    // Call getReception to fetch receptions data
    const { receptions } = await getReception(req, res);

    const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
    const limit = 2; // Number of entries per page
    const skip = (page - 1) * limit;

    // Fetch all storage data
    // const allStorage = await RECEPTION.find();
    const allStorage = await RECEPTION.find().skip(skip).limit(limit);
    const totalEntries = await RECEPTION.countDocuments();

    const totalPages = Math.ceil(totalEntries / limit);

    // Fetch the most recent storage data
    const latestStorage = await RECEPTION.findOne().sort({ _id: -1 });

    // Render the index page with the receptions data
    res.render('adminViewReception', { 
      data: receptions, 
      allStorage, 
      latestStorage,
      currentPage: page, 
      totalPages: totalPages,
      locals 
    });
  } catch (error) {
    console.error('Error rendering the page:', error);
    res.status(500).send('Internal Server Error');
  }
};

//adminViewReception
// Create Admin RECEPTION
export const createAdminReception = async (req, res) => {
  try {
    const newStorage = new RECEPTION({
        studyName: req.body.studyName,
        sampleId: req.body.sampleId,
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

// Get receptions data
export const getAdminReception = async () => {

}

export const editPost = async (req, res) => {
  try {
    await RECEPTION.findByIdAndUpdate(req.params.id, {
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
    await RECEPTION.deleteOne({ _id: req.params.id });
    res.redirect("/viewReception");
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get /
 * Search Reception Data
 */
// export const searchReceptions = async (req, res) => {
//   const locals = {
//     title: "KHRC",
//     description: "Kambia Health Research Center KHRC System",
//   };

//   try {
//     const searchTerm = req.body.searchTerm;
//     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

//     const receptions = await RECEPTION.find({
//       $or: [
//         { studyName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//         { sampleId: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//         { visitName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//         { sampleQuality: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//         { ageAtVisit: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//         { entryDoneBy: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//       ],
//     });

//     res.render("viewReception", {
//       receptions,
//       locals,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };


export const view = async (req, res) => {
  try {
    const storage = await RECEPTION.findOne({ _id: req.params.id });

    const locals = {
      title: "KHRC",
       description: "Kambia Health Research Center KHRC System",
    };

    res.render("adminView", {
      locals,
      storage,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const userView = async (req, res) => {
//   try {
//     const storage = await RECEPTION.findOne({ _id: req.params.id });

//     const locals = {
//       title: "KHRC",
//        description: "Kambia Health Research Center KHRC System",
//     };

//     res.render("view", {
//       locals,
//       storage,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 * GET /
 * Edit Customer Data
 */
export const edit = async (req, res) => {
  try {
    const storage = await RECEPTION.findOne({ _id: req.params.id });

    const locals = {
      title: "KHRC",
      description: "Kambia Health Research Center KHRC System",
    };

    res.render("adminEdit", {
      locals,
      storage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await RECEPTION.findOneAndDelete({ _id: req.params.id });

    if (!deletedRecord) {
      return res.status(404).send("Record not found");
    }

    res.redirect("/admin-view-reception"); // Redirect to a specific page after successful delete
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
