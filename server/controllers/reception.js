import RECEPTION from '../models/reception.js';
import CSS from "../models/css.js";
import LS1 from "../models/ls1.js";
import LS2 from "../models/ls2.js";
import LS1_2ND from "../models/ls1-2.js";
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

    const latestStorageCss = await CSS.findOne().sort({ _id: -1 });
    const latestStorageLs11 = await LS1.findOne().sort({ _id: -1 });
    const latestStorageLs12 = await LS1_2ND.findOne().sort({ _id: -1 });
    const latestStorageLs2 = await LS2.findOne().sort({ _id: -1 });

     const user = req.isAuthenticated() ? req.user : null;

    // Determine the time of the day
    const greeting = getTimeOfDay();

    // Render the index page with the receptions data
    res.render('index-admin', { data: receptions, allStorage, latestStorage, locals, user, greeting, latestStorageCss, latestStorageLs11, latestStorageLs12, latestStorageLs2});
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

    const user = req.isAuthenticated() ? req.user : null;

     // Determine the time of the day
     const greeting = getTimeOfDay();

    // Render the index page with the receptions data
    res.render('viewReception', { 
      data: receptions, 
      allStorage, 
      latestStorage,
      currentPage: page, 
      totalPages: totalPages,
      locals,
      greeting,
      user,
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

    const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
    const limit = 5; // Number of entries per page
    const skip = (page - 1) * limit;

    // Fetch all storage data
    // const allStorage = await RECEPTION.find();
    const allStorage = await RECEPTION.find().skip(skip).limit(limit);
    const totalEntries = await RECEPTION.countDocuments();

    const totalPages = Math.ceil(totalEntries / limit);

    // Fetch the most recent storage data
    const latestStorage = await RECEPTION.findOne().sort({ _id: -1 });

    const user = req.isAuthenticated() ? req.user : null;

  // Determine the time of the day
  const greeting = getTimeOfDay();

    // Render the index page with the receptions data
    res.render('adminViewReception', { 
      data: receptions, 
      allStorage, 
      latestStorage,
      currentPage: page, 
      totalPages: totalPages,
      locals,
      greeting,
      user,
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
// export const getAdminReception = async () => {

// }

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

// Update RECEPTION
export const updateAdminReception = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID of the record to be updated

    // Find the existing RECEPTION record by ID and update its fields
    const updatedStorage = await RECEPTION.findByIdAndUpdate(id, req.body, { new: true });

    // Check if the RECEPTION record exists
    if (!updatedStorage) {
      return res.status(404).json({ message: 'RECEPTION record not found' });
    }

    // Respond with the updated RECEPTION record
    res.status(200).render('update-success/reception', { updatedStorage });
  } catch (error) {
    console.error('Error updating RECEPTION record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


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

    res.render("adminReceptionEdit", {
      locals,
      storage,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete Reception Data
export const deleteRecord = async (req, res) => {
  try {
    await RECEPTION.deleteOne({ _id: req.params.id });
    res.render("success-delete/reception");
  } catch (error) {
    console.log(error);
  }
};

// Get Reception without pagination
export const getAllReception = async (req, res) => {
  try {
    const allStorage = await RECEPTION.find();

   res.render('see_more/reception', { 
    allStorage
})
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
