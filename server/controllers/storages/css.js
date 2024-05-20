import RECEPTION from '../../models/reception.js';
import CSS from '../../models/css.js';
import dotenv from 'dotenv';
import Position from '../../models/position/css.js';
import { getCurrentPosition, updatePosition } from '../positions/css.js';

dotenv.config();

// Function to calculate compartment, rage, and tray based on current position
const calculateCompartmentRageTray = (currentPosition) => {
  const compartmentsPerFreezer = 4;
  const ragesPerCompartment = 5;
  const traysPerRage = 4;
  const boxesPerTray = 4;

  const totalCompartments = compartmentsPerFreezer;
  const totalRages = compartmentsPerFreezer * ragesPerCompartment;
  const totalTrays = totalRages * traysPerRage;
  const totalBoxes = totalTrays * boxesPerTray;

  const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

  const compartment = Math.floor(currentPositionIndex / totalBoxes) + 1;
  const remainingPositions = currentPositionIndex % totalBoxes;
  const rage = Math.floor(remainingPositions / (traysPerRage * boxesPerTray)) + 1;
  const remainingPositionsInRage = remainingPositions % (traysPerRage * boxesPerTray);
  const tray = Math.floor(remainingPositionsInRage / boxesPerTray) + 1;

  return { compartment, rage, tray };
};

// Global variables to track the current rage number, compartment completion, and consecutive requests
let currentRageNumber = 1;
let compartmentCompleted = false;
let consecutiveRequests = 0;

// Function to handle incrementing the rage count and checking compartment completion
const incrementRageCount = async () => {
    currentRageNumber++;
    if (currentRageNumber > 5) {
        currentRageNumber = 1;
        compartmentCompleted = true;
    }
};

// Function to check if the current tray is full
const isCurrentTrayFull = async () => {
    return boxNumber === 4;
};

// Function to handle incrementing the compartment count
const incrementCompartmentCount = async () => {
    compartmentCompleted = false;
    // Implement logic here to handle compartment count incrementation
    // Increment compartment count if all rages in the compartment are filled
};

// Function to check if the current box is full
const isCurrentBoxFull = async (currentPosition) => {
    return currentPosition.currentRow === 'I' && currentPosition.currentColumn === 9;
};

// Create storage function
export const createStorage = async (req, res) => {
    try {
        // Check if the sampleId already exists in the database
        const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
        if (existingStorage) {
            return res.status(400).json({ message: 'SampleId already exists' });
        }

        // Retrieve the current position from the database
        let currentPosition = await getCurrentPosition();

        // Update the current row and column values in the database
        await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

        // Calculate compartment, rage, and tray based on current position
        const { compartment, rage, tray } = calculateCompartmentRageTray(currentPosition);

        // Append 'A' & 'B' to the sampleId for the urinePallet 
        const sampleIdWithA = req.body.sampleId + 'A';
        const sampleIdWithB = req.body.sampleId + 'B';

        // Check if the current box is full
        const isBoxFull = await isCurrentBoxFull(currentPosition);

        // Increment boxNumber for the current box
        let boxNumber = 1;

        if (isBoxFull) {
            // If box is full, increment boxNumber
            boxNumber++;
            if (boxNumber > 4) {
                // If all boxes in tray are filled, increment tray count
                await incrementTrayCount();
                if (await isCurrentTrayFull()) {
                    // If current tray is full, reset boxNumber and increment compartment count
                    boxNumber = 1;
                    await incrementCompartmentCount();
                }
            }
        }

        // Create new CSS storage entry
        const newStorage = new CSS({
            sampleId: req.body.sampleId,
            visitName: req.body.visitName,
            sampleType: req.body.sampleType,
            roomNumber: req.body.roomNumber,
            freezerNumber: req.body.freezerNumber,
            tray: currentRageNumber, // Changed to currentRageNumber
            boxNumber,
            row: currentPosition.currentRow,
            column: currentPosition.currentColumn,
            compartment,
            rage,
            urinePalletA: sampleIdWithA,
            urinePalletB: sampleIdWithB,
            dnaExtration: req.body.dnaExtration,
            comments: req.body.comments,
            dateOfEntry: req.body.dateOfEntry,
            entryDoneBy: req.body.entryDoneBy,
        });

        // Save new storage entry
        const savedStorage = await newStorage.save();

        // Move to the next row and column
        if (currentPosition.currentColumn === 9) {
            currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
            currentPosition.currentColumn = 1; // Reset column to 1
        } else {
            currentPosition.currentColumn++; // Move to the next column
        }

        // Update the current row and column values in the database
        await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

        // Increment consecutive requests count
        consecutiveRequests++;

        // Check if compartment is completed
        if (compartmentCompleted) {
            await incrementCompartmentCount();
        }

        // Check if 81 consecutive requests have been made
        if (consecutiveRequests === 81) {
            // Reset consecutiveRequests count
            consecutiveRequests = 0;
            // Increment tray count
            await incrementRageCount();
        }

        // Redirect to success page after storing data
        res.status(201).render('storage-success/css');
        console.log(savedStorage);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
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

// Update CSS 
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