import RECEPTION from '../../models/reception.js';
import CSS from '../../models/css.js';
import dotenv from 'dotenv';
import Position from '../../models/position/css.js';
import { getCurrentPosition, updatePosition } from '../positions/css.js';

dotenv.config();

// Function to calculate compartment, rack, and tray based on current position
const calculateCompartmentRageTray = (slots) => {
  let boxCount = parseInt((slots - 1) / 81) + 1;
  let boxNumber = (boxCount % 4) === 0 ? 4 : boxCount % 4;
  
  let trayCount = parseInt((boxCount - 1) / 4) + 1;
  let tray = (trayCount % 4) === 0 ? 4 : trayCount % 4;
  
  let rackCount = parseInt((trayCount - 1) / 4) + 1;
  let rack = (rackCount % 4) === 0 ? 4 : rackCount % 4;
  
  let compartmentCount = parseInt((rackCount - 1) / 5) + 1;
  let compartment = (compartmentCount % 5) === 0 ? 5 : compartmentCount % 5;
  return { compartment, rack, tray, boxNumber };
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
        
        let slotNumber;

        try {
          const count = await CSS.countDocuments({});
          console.log('Total count:', count);
          if(count > 0) {
            try {
              const lastDocument = await CSS.findOne().sort({ createdAt: -1 }).limit(1);
              slotNumber = lastDocument.slotNumber;
            } catch (err) {
              console.error(err);
            }
          } else {
            slotNumber = 0;
          }
        } catch (err) {
          console.error(err);
        }

        slotNumber++;
        // Calculate compartment, rack, and tray based on current position
        const { compartment, rack, tray, boxNumber } = calculateCompartmentRageTray(slotNumber);

        // Append 'A' & 'B' to the sampleId for the urinePallet 
        const sampleIdWithA = req.body.sampleId + 'A';
        const sampleIdWithB = req.body.sampleId + 'B';

        // Create new CSS storage entry
        const newStorage = new CSS({
            sampleId: req.body.sampleId,
            visitName: req.body.visitName,
            sampleType: req.body.sampleType,
            roomNumber: req.body.roomNumber,
            freezerNumber: req.body.freezerNumber,
            boxNumber,
            row: currentPosition.currentRow,
            column: currentPosition.currentColumn,
            compartment,
            rack,
            tray,
            urinePalletA: sampleIdWithA,
            urinePalletB: sampleIdWithB,
            dnaExtration: req.body.dnaExtration,
            comments: req.body.comments,
            dateOfEntry: req.body.dateOfEntry,
            entryDoneBy: req.body.entryDoneBy,
            slotNumber
        });

        // Save new storage entry
        const savedStorage = await newStorage.save();

        // Move to the next row and column
        if (currentPosition.currentColumn === 9) {
            if(currentPosition.currentRow === 'I') {
                currentPosition.currentRow = 'A';
            } else {
                currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
            }
            currentPosition.currentColumn = 1; // Reset column to 1
        } else {
            currentPosition.currentColumn++; // Move to the next column
        }

        // Update the current row and column values in the database
        await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);
        
        // Redirect to success page after storing data
        res.status(201).render('storage-success/css');
        console.log(savedStorage);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// const calculateCompartmentRackTray = (slots) => {
//   let boxCount = Math.floor((slots - 1) / 81) + 1;
//   let boxNumber = (boxCount % 4) === 0 ? 4 : boxCount % 4;

//   let trayCount = Math.floor((boxCount - 1) / 4) + 1;
//   let tray = (trayCount % 4) === 0 ? 4 : trayCount % 4;

//   let rackCount = Math.floor((trayCount - 1) / 4) + 1;
//   let rack = (rackCount % 4) === 0 ? 4 : rackCount % 4;

//   let compartmentCount = Math.floor((rackCount - 1) / 5) + 1;
//   let compartment = (compartmentCount % 5) === 0 ? 5 : compartmentCount % 5;

//   return { compartment, rack, tray, boxNumber };
// };



// export const createStorage = async (req, res) => {
//   try {
//     // Check if the sampleId already exists in the database
//     const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
//     if (existingStorage) {
//       return res.status(400).json({ message: 'SampleId already exists' });
//     }

//     // Retrieve the current position from the database
//     const currentPosition = await getCurrentPosition();

//     // Fetch the last document's slotNumber
//     const lastDocument = await CSS.findOne().sort({ createdAt: -1 }).limit(1);
//     let slotNumber = lastDocument ? lastDocument.slotNumber + 1 : 1;

//     // Calculate compartment, rack, tray, and box number
//     const { compartment, rack, tray, boxNumber } = calculateCompartmentRackTray(slotNumber);

//     // Append 'A' & 'B' to the sampleId for the urinePallet
//     const sampleIdWithA = `${req.body.sampleId}A`;
//     const sampleIdWithB = `${req.body.sampleId}B`;

//     // Create new CSS storage entry
//     const newStorage = new CSS({
//       sampleId: req.body.sampleId,
//       visitName: req.body.visitName,
//       sampleType: req.body.sampleType,
//       roomNumber: req.body.roomNumber,
//       freezerNumber: req.body.freezerNumber,
//       boxNumber,
//       row: currentPosition.currentRow,
//       column: currentPosition.currentColumn,
//       compartment,
//       rack,
//       tray,
//       urinePalletA: sampleIdWithA,
//       urinePalletB: sampleIdWithB,
//       dnaExtration: req.body.dnaExtration,
//       comments: req.body.comments,
//       dateOfEntry: req.body.dateOfEntry,
//       entryDoneBy: req.body.entryDoneBy,
//       slotNumber
//     });

//     // Save new storage entry
//     const savedStorage = await newStorage.save();

//     // Move to the next row and column
//     if (currentPosition.currentColumn === 9) {
//       currentPosition.currentColumn = 1;
//       currentPosition.currentRow = currentPosition.currentRow === 'I' ? 'A' : String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1);
//     } else {
//       currentPosition.currentColumn++;
//     }

//     // Update the current row and column values in the database
//     await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//     // Redirect to success page after storing data
//     res.status(201).render('storage-success/css');
//     console.log(savedStorage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

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
// export const deleteStorage = async (req, res) => {
//   try {
//     await CSS.deleteOne({ _id: req.params.id });
//     res.render("success-delete/storage");
//   } catch (error) {
//     console.log(error);
//   }
// };

// Delete css data
export const deleteStorage = async (req, res) => {
  try {
      const deletedStorage = await CSS.findOneAndDelete({ _id: req.params.id });
      if (deletedStorage) {
          // Get the current position
          const currentPosition = await getCurrentPosition();

          // Decrement the current column value
          const newColumn = currentPosition.currentColumn - 1;

          // If the current column becomes 0, decrement the current row and set the column to the maximum value
          if (newColumn === 0) {
              const newRowCharCode = currentPosition.currentRow.charCodeAt(0) - 1;
              const newRow = String.fromCharCode(newRowCharCode);
              await updatePosition(newRow, MAX_COLUMN_VALUE); // Set MAX_COLUMN_VALUE to the maximum column value
          } else {
              await updatePosition(currentPosition.currentRow, newColumn);
          }

          res.render("success-delete/storage");
      } else {
          res.status(404).send("Storage not found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
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