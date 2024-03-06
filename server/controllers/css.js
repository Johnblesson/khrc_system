import CSS from '../models/css.js';
import RECEPTION from '../models/reception.js';
import dotenv from 'dotenv';
import Position from '../models/position.js';
dotenv.config();

// Create Cross-sectional Survey-CSS
let currentRow = 'A';
let currentColumn = 1;

// Function to update the current row and column values in the database
const updatePosition = async (row, column) => {
  try {
    await Position.findOneAndUpdate({}, { currentRow: row, currentColumn: column }, { upsert: true });
  } catch (error) {
    console.error('Error updating position:', error);
  }
};

export const createStorage = async (req, res) => {
  try {
    // Append 'A' to the sampleId
    const sampleIdWithA = req.body.sampleId + 'A';
    const sampleIdWithB = req.body.sampleId + 'B';

    const newStorage = new CSS({
      sampleId: req.body.sampleId,
      visitName: req.body.visitName,
      sampleType: req.body.sampleType,
      roomNumber: req.body.roomNumber,
      boxNumber: req.body.boxNumber,
      row: currentRow,
      column: currentColumn,
      compartment: req.body.compartment,
      rage: req.body.rage,
      urinePalletA: sampleIdWithA,
      urinePalletB: sampleIdWithB,
      dnaExtration: req.body.dnaExtration,
      comments: req.body.comments,
      dateOfEntry: req.body.dateOfEntry,
      entryDoneBy: req.body.entryDoneBy,
    });

    const savedStorage = await newStorage.save();

    // Move to the next row and column
    if (currentColumn === 9) {
      currentRow = String.fromCharCode(currentRow.charCodeAt(0) + 1); // Move to the next row
      currentColumn = 1; // Reset column to 1
    } else {
      currentColumn++; // Move to the next column
    }

    // Update the current row and column values in the database
    await updatePosition(currentRow, currentColumn);

    res.status(201).render('storage-success/css');
    console.log(savedStorage);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};


// Get Cross-sectional Survey-CSS
export const getStorage = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
    const limit = 4; // Number of entries per page
    const skip = (page - 1) * limit;

    // Fetch all storage data
    // const allStorage = await RECEPTION.find();
    const allStorage = await CSS.find().skip(skip).limit(limit);
    const totalEntries = await CSS.countDocuments();

    const totalPages = Math.ceil(totalEntries / limit);
    // const allStorage = await CSS.find();

    // Fetch the most recent storage data
    const latestStorage = await CSS.findOne().sort({ _id: -1 });

   res.render('allCss', { 
    allStorage, 
    latestStorage, 
    currentPage: page, 
    totalPages: totalPages,
})
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

// Get Cross-sectional Survey-CSS without pagination
export const getAllCss = async (req, res) => {
  try {
    const allStorage = await CSS.find();

   res.render('see_more/css', { 
    allStorage
})
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};


// retrieve and return all users/ retrive and return a single user
export const findStorage = (req, res)=>{

  if(req.query.id){
      const id = req.query.id;

      CSS.findById(id)
          .then(data =>{
              if(!data){
                  res.status(404).send({ message : "Not found user with id "+ id})
              }else{
                  res.send(data)
              }
          })
          .catch(err =>{
              res.status(500).send({ message: "Erro retrieving user with id " + id})
          })

  }else{
      CSS.find()
          .then(user => {
              res.send(user)
          })
          .catch(err => {
              res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
          })
  }   
}

// Update a new idetified user by user id
export const updateStorage = (req, res)=>{
  if(!req.body){
      return res
          .status(400)
          .send({ message : "Data to update can not be empty"})
  }

  const id = req.params.id;
  CSS.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
          }else{
              res.send(data)
          }
      })
      .catch(err =>{
          res.status(500).send({ message : "Error Update user information"})
      })
}

// Delete css data
export const deleteStorage = async (req, res) => {
  try {
    await CSS.deleteOne({ _id: req.params.id });
    res.render("success-delete/storage");
  } catch (error) {
    console.log(error);
  }
};

// View Cross-sectional Survey-CSS
export const cssView = async (req, res) => {
    try {
      const storage = await CSS.findOne({ _id: req.params.id });
  
      const locals = {
        title: "KHRC",
         description: "Kambia Health Research Center KHRC System",
      };
  
      res.render("view-css", {
        locals,
        storage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // export const cssTable = async (req, res) => {
  //   try {
  //     const storage = await CSS.find();
  
  //     const locals = {
  //       title: "KHRC",
  //        description: "Kambia Health Research Center KHRC System",
  //     };
  
  //     res.render("table-css", {
  //       locals,
  //       storage,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  export const cssTable = async (req, res) => {
    try {
      // Find all documents in the CSS collection
      const storage = await CSS.find();
  
      // Extract sampleIds from the storage documents
      const sampleIds = storage.map(item => item.sampleId);
  
      const locals = {
        title: "KHRC",
        description: "Kambia Health Research Center KHRC System",
      };
  
      res.render("table-css", {
        locals,
        storage,
        sampleIds,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  
/**
 * Get /
 * Search Reception Data
 */
export const searchCss = async (req, res) => {
  const locals = {
    title: "KHRC",
    description: "Kambia Health Research Center KHRC System",
  };

  try {
    const searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const receptions = await CSS.find({
      $or: [
        { studyName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { sampleId: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { visitName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("viewReception", {
      receptions,
      locals,
    });
  } catch (error) {
    console.error(error);
  }
};

// View Edit Cross-sectional Survey-CSS GET REQUEST
export const edit_css = async (req, res) => {
  try {
    const storage = await CSS.findOne({ _id: req.params.id });

    // Fetch all sampleId values from the database
    const sampleIds = await RECEPTION.distinct('sampleId');

    const user = req.isAuthenticated() ? req.user : null;

    const locals = {
      title: "KHRC",
      description: "Kambia Health Research Center KHRC System",
    };

    res.render("edit-storage/css", {
      locals,
      storage,
      sampleIds,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to update the current row and column values in the database
const updatePosition1 = async (row, column) => {
  try {
    await Position.findOneAndUpdate({}, { currentRow: row, currentColumn: column }, { upsert: true });
  } catch (error) {
    console.error('Error updating position:', error);
  }
};

export const updateStorage1 = async (req, res) => {
  try {
    // Extract the CSS ID from the request parameters
    const { id } = req.params;

    // Find the CSS record by ID and update its fields
    const updatedStorage = await CSS.findByIdAndUpdate(id, req.body, { new: true });

    // Check if the CSS record exists
    if (!updatedStorage) {
      return res.status(404).json({ message: 'CSS record not found' });
    }

    // Update the current row and column values in the database
    await updatePosition1(updatedStorage.row, updatedStorage.column);

    // Respond with the updated CSS record
    // res.status(200).json(updatedStorage);
    res.render('update-success/storage');
  } catch (error) {
    console.error('Error updating CSS record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};