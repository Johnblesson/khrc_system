// export const createStorage = async (req, res) => {
//     try {
//         // Check if the sampleId already exists in the database
//         const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
//         if (existingStorage) {
//             return res.status(400).json({ message: 'SampleId already exists' });
//         }
  
//         // Retrieve the current position from the database
//         let currentPosition = await getCurrentPosition();
  
//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);
  
//         // Calculate compartment, rage, and tray based on current position
//         const { compartment, rage, tray } = calculateCompartmentRageTray(currentPosition);
  
//         // Append 'A' & 'B' to the sampleId for the urinePallet 
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';
  
//         // Check if the current box is full
//         const isBoxFull = await isCurrentBoxFull(currentPosition);
  
//         // Generate the boxNumber based on the current tray
//         let boxNumber = 1;
  
//         // Increment tray count if a box is completed
//         if (isBoxFull) {
//             boxNumber = 1; // Increment box number for the new box
//             // Check if all boxes in the tray are filled
//             if (boxNumber === 1) {
//                 // Increment tray count
//                 currentTrayNumber++;
//                 // Check if the tray is full
//                 if (currentTrayNumber > 4) {
//                     // Reset tray count
//                     currentTrayNumber = 1;
//                     // Increment rage count
//                     rage++;
//                     // Check if the rage is full
//                     if (rage > 4) {
//                         // Reset rage count
//                         rage = 1;
//                         // Increment compartment count
//                         compartment++;
//                         // Check if the compartment is full
//                         if (compartment > 5) {
//                             // All compartments are full, handle accordingly (e.g., stop the process)
//                             // For now, we'll log a message
//                             console.log("Freezer is full");
//                             return res.status(400).json({ message: 'Freezer is full' });
//                         }
//                     }
//                 }
//             }
//         } else {
//             // Increment boxNumber for the current box
//             boxNumber = 1;
//         }
      
//         const newStorage = new CSS({
//             sampleId: req.body.sampleId,
//             visitName: req.body.visitName,
//             sampleType: req.body.sampleType,
//             roomNumber: req.body.roomNumber,
//             freezerNumber: req.body.freezerNumber,
//             tray: currentTrayNumber,
//             boxNumber,
//             row: currentPosition.currentRow,
//             column: currentPosition.currentColumn,
//             compartment,
//             rage,
//             urinePalletA: sampleIdWithA,
//             urinePalletB: sampleIdWithB,
//             dnaExtration: req.body.dnaExtration,
//             comments: req.body.comments,
//             dateOfEntry: req.body.dateOfEntry,
//             entryDoneBy: req.body.entryDoneBy,
//         });
  
//         const savedStorage = await newStorage.save();
  
//         // Move to the next row and column
//         if (currentPosition.currentColumn === 9) {
//           currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
//           currentPosition.currentColumn = 1; // Reset column to 1
//         } else {
//           currentPosition.currentColumn++; // Move to the next column
//         }
  
//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);
  
//         // Increment consecutive requests count
//         consecutiveRequests++;
  
//         // Check if 81 consecutive requests have been made
//         if (consecutiveRequests === 81) {
//             // Reset consecutiveRequests count
//             consecutiveRequests = 0;
//             // Increment tray count
//             currentTrayNumber++;
//             // Check if the tray is full
//             if (currentTrayNumber > 4) {
//                 // Reset tray count
//                 currentTrayNumber = 1;
//                 // Increment rage count
//                 rage++;
//                 // Check if the rage is full
//                 if (rage > 4) {
//                     // Reset rage count
//                     rage = 1;
//                     // Increment compartment count
//                     compartment++;
//                     // Check if the compartment is full
//                     if (compartment > 5) {
//                         // All compartments are full, handle accordingly (e.g., stop the process)
//                         // For now, we'll log a message
//                         console.log("Freezer is full");
//                         return res.status(400).json({ message: 'Freezer is full' });
//                     }
//                 }
//             }
//         }
  
//          // Redirect to success page after storing data
//          res.status(201).render('storage-success/css');
//          console.log(savedStorage);
//     } catch (error) {
//         return res.status(500).json({ message: error });
//     }
//   };




// export const createStorage = async (req, res) => {
//     try {
//         // Check if the sampleId already exists in the database
//         const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
//         if (existingStorage) {
//             return res.status(400).json({ message: 'SampleId already exists' });
//         }

//         // Retrieve the current position from the database
//         let currentPosition = await getCurrentPosition();

//         // Calculate compartment, rage, and tray based on current position
//         const { compartment, rage, tray } = calculateCompartmentRageTray(currentPosition);

//         // Append 'A' & 'B' to the sampleId for the urinePallet 
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         // Check if the current box is full
//         const isBoxFull = await isCurrentBoxFull(currentPosition);

//         // Generate the boxNumber based on the current tray
//         let boxNumber = 1;

//         // Increment tray count if a box is completed
//         if (isBoxFull) {
//             boxNumber = 1; // Increment box number for the new box
//             // Check if all boxes in the tray are filled
//             if (boxNumber === 1) {
//                 // Increment tray count
//                 currentTrayNumber++;
//                 // Check if the tray is full
//                 if (currentTrayNumber > 4) {
//                     // Reset tray count
//                     currentTrayNumber = 1;
//                     // Increment rage count
//                     rage++;
//                     // Check if the rage is full
//                     if (rage > 4) {
//                         // Reset rage count
//                         rage = 1;
//                         // Increment compartment count
//                         compartment++;
//                         // Check if the compartment is full
//                         if (compartment > 5) {
//                             // All compartments are full, handle accordingly (e.g., stop the process)
//                             // For now, we'll log a message
//                             console.log("Freezer is full");
//                             return res.status(400).json({ message: 'Freezer is full' });
//                         }
//                     }
//                 }
//             }
//         } else {
//             // Increment boxNumber for the current box
//             boxNumber = 1;
//         }
      
//         const newStorage = new CSS({
//             sampleId: req.body.sampleId,
//             visitName: req.body.visitName,
//             sampleType: req.body.sampleType,
//             roomNumber: req.body.roomNumber,
//             freezerNumber: req.body.freezerNumber,
//             tray: currentTrayNumber,
//             boxNumber,
//             row: currentPosition.currentRow,
//             column: currentPosition.currentColumn,
//             compartment,
//             rage,
//             urinePalletA: sampleIdWithA,
//             urinePalletB: sampleIdWithB,
//             dnaExtration: req.body.dnaExtration,
//             comments: req.body.comments,
//             dateOfEntry: req.body.dateOfEntry,
//             entryDoneBy: req.body.entryDoneBy,
//         });

//         const savedStorage = await newStorage.save();

//         // Move to the next row and column
//         if (currentPosition.currentColumn === 9) {
//           currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
//           currentPosition.currentColumn = 1; // Reset column to 1
//         } else {
//           currentPosition.currentColumn++; // Move to the next column
//         }

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         // Redirect to success page after storing data
//         res.status(201).render('storage-success/css');
//         console.log(savedStorage);
//     } catch (error) {
//         return res.status(500).json({ message: error });
//     }
// };


// RECENT
// calculateCompartmentRageTray

// // Global variable to track the number of consecutive requests
// let consecutiveRequests = 0;

// // Global variable to track the current tray number
// let currentTrayNumber = 1;

// // Function to calculate compartment, rage, and tray based on current position
// const calculateCompartmentRageTray = (currentPosition) => {
//     const compartmentsPerFreezer = 4;
//     const ragesPerCompartment = 5;
//     const traysPerRage = 4;
//     const boxesPerTray = 4;

//     const totalCompartments = compartmentsPerFreezer;
//     const totalRages = compartmentsPerFreezer * ragesPerCompartment;
//     const totalTrays = totalRages * traysPerRage;
//     const totalBoxes = totalTrays * boxesPerTray;

//     const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

//     const compartment = Math.floor(currentPositionIndex / totalBoxes) + 1;
//     const remainingPositions = currentPositionIndex % totalBoxes;
//     const rage = Math.floor(remainingPositions / (traysPerRage * boxesPerTray)) + 1;
//     const remainingPositionsInRage = remainingPositions % (traysPerRage * boxesPerTray);
//     const tray = Math.floor(remainingPositionsInRage / boxesPerTray) + 1;

//     return { compartment, rage, tray };
// };

// // Function to check if the current box is full
// const isCurrentBoxFull = async (currentPosition) => {
//     return currentPosition.currentRow === 'I' && currentPosition.currentColumn === 9;
// };

// // Function to handle incrementing the tray count
// const incrementTrayCount = async () => {
//     currentTrayNumber++;
// };

// // Create Cross-sectional Survey-CSS
// let currentRow = 'A';
// let currentColumn = 1;

// // Create storage function
// export const createStorage = async (req, res) => {
//     try {
//         // Check if the sampleId already exists in the database
//         const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
//         if (existingStorage) {
//             return res.status(400).json({ message: 'SampleId already exists' });
//         }

//         // Retrieve the current position from the database
//         let currentPosition = await getCurrentPosition();

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         // Calculate compartment, rage, and tray based on current position
//         const { compartment, rage, tray } = calculateCompartmentRageTray(currentPosition);

//         // Append 'A' & 'B' to the sampleId for the urinePallet 
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         // Check if the current box is full
//         const isBoxFull = await isCurrentBoxFull(currentPosition);

//         // Generate the boxNumber based on the current tray
//         let boxNumber = 1;

//         // Increment tray count if a box is completed
//         if (isBoxFull) {
//             boxNumber = 1; // Increment box number for the new box
//             // Check if all boxes in the tray are filled
//             if (boxNumber === 1) {
//                 await incrementTrayCount(); // Increment tray count
//             }
//         } else {
//             // Increment boxNumber for the current box
//             boxNumber = 1;
//         }
      
//         const newStorage = new CSS({
//             sampleId: req.body.sampleId,
//             visitName: req.body.visitName,
//             sampleType: req.body.sampleType,
//             roomNumber: req.body.roomNumber,
//             freezerNumber: req.body.freezerNumber,
//             tray: currentTrayNumber,
//             boxNumber,
//             row: currentPosition.currentRow,
//             column: currentPosition.currentColumn,
//             compartment,
//             rage,
//             urinePalletA: sampleIdWithA,
//             urinePalletB: sampleIdWithB,
//             dnaExtration: req.body.dnaExtration,
//             comments: req.body.comments,
//             dateOfEntry: req.body.dateOfEntry,
//             entryDoneBy: req.body.entryDoneBy,
//         });

//         const savedStorage = await newStorage.save();

//         // Move to the next row and column
//         if (currentPosition.currentColumn === 9) {
//           currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
//           currentPosition.currentColumn = 1; // Reset column to 1
//         } else {
//           currentPosition.currentColumn++; // Move to the next column
//         }

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         // Increment consecutive requests count
//         consecutiveRequests++;

//         // Check if 81 consecutive requests have been made
//         if (consecutiveRequests === 81) {
//             // Reset consecutiveRequests count
//             consecutiveRequests = 0;
//             // Increment tray count
//             await incrementTrayCount();
//         }

//         // Redirect to success page after storing data
//         res.status(201).render('storage-success/css');
//         console.log(savedStorage);
//     } catch (error) {
//         return res.status(500).json({ message: error });
//     }
// };

// ANOTHER
// Global variable to track the number of consecutive requests
// let consecutiveRequests = 0;

// // Global variable to track compartment completion
// let compartmentCompleted = false;

// // Function to calculate compartment, rage, and tray based on current position
// const calculateCompartmentRageTray = (currentPosition) => {
//     const compartmentsPerFreezer = 4;
//     const ragesPerCompartment = 5;
//     const traysPerRage = 4;
//     const boxesPerTray = 4;

//     const totalCompartments = compartmentsPerFreezer;
//     const totalRages = compartmentsPerFreezer * ragesPerCompartment;
//     const totalTrays = totalRages * traysPerRage;
//     const totalBoxes = totalTrays * boxesPerTray;

//     const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

//     const compartment = Math.floor(currentPositionIndex / totalBoxes) + 1;
//     const remainingPositions = currentPositionIndex % totalBoxes;
//     const rage = Math.floor(remainingPositions / (traysPerRage * boxesPerTray)) + 1;
//     const remainingPositionsInRage = remainingPositions % (traysPerRage * boxesPerTray);
//     const tray = Math.floor(remainingPositionsInRage / boxesPerTray) + 1;

//     return { compartment, rage, tray };
// };

// // Function to check if the current box is full
// const isCurrentBoxFull = async (currentPosition) => {
//     return currentPosition.currentRow === 'I' && currentPosition.currentColumn === 9;
// };

// // Create storage function
// export const createStorage = async (req, res) => {
//     try {
//         // Check if the sampleId already exists in the database
//         const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
//         if (existingStorage) {
//             return res.status(400).json({ message: 'SampleId already exists' });
//         }

//         // Retrieve the current position from the database
//         let currentPosition = await getCurrentPosition();

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         // Calculate compartment, rage, and tray based on current position
//         const { compartment, rage, tray } = calculateCompartmentRageTray(currentPosition);

//         // Append 'A' & 'B' to the sampleId for the urinePallet 
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         // Check if the current box is full
//         const isBoxFull = await isCurrentBoxFull(currentPosition);

//         // Increment boxNumber for the current box
//         let boxNumber = 1;

//         if (isBoxFull) {
//             // If box is full, increment boxNumber and check if all boxes in tray are filled
//             boxNumber++;
//             if (boxNumber > 4) {
//                 // If all boxes in tray are filled, increment tray count
//                 await incrementTrayCount();
//                 if (await isCurrentTrayFull()) {
//                     // If current tray is full, reset boxNumber and increment compartment count
//                     boxNumber = 1;
//                     await incrementCompartmentCount();
//                 }
//             }
//         }

//         // Create new CSS storage entry
//         const newStorage = new CSS({
//             sampleId: req.body.sampleId,
//             visitName: req.body.visitName,
//             sampleType: req.body.sampleType,
//             roomNumber: req.body.roomNumber,
//             freezerNumber: req.body.freezerNumber,
//             tray,
//             boxNumber,
//             row: currentPosition.currentRow,
//             column: currentPosition.currentColumn,
//             compartment,
//             rage,
//             urinePalletA: sampleIdWithA,
//             urinePalletB: sampleIdWithB,
//             dnaExtration: req.body.dnaExtration,
//             comments: req.body.comments,
//             dateOfEntry: req.body.dateOfEntry,
//             entryDoneBy: req.body.entryDoneBy,
//         });

//         // Save new storage entry
//         const savedStorage = await newStorage.save();

//         // Move to the next row and column
//         if (currentPosition.currentColumn === 9) {
//             currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
//             currentPosition.currentColumn = 1; // Reset column to 1
//         } else {
//             currentPosition.currentColumn++; // Move to the next column
//         }

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         // Increment consecutive requests count
//         consecutiveRequests++;

//         // Check if compartment is completed
//         if (compartmentCompleted) {
//             await incrementCompartmentCount();
//         }

//         // Check if 81 consecutive requests have been made
//         if (consecutiveRequests === 81) {
//             // Reset consecutiveRequests count
//             consecutiveRequests = 0;
//             // Increment tray count
//             await incrementRageCount();
//         }

//         // Redirect to success page after storing data
//         res.status(201).render('storage-success/css');
//         console.log(savedStorage);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

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

// // Function to check if the current box is full
// const isCurrentBoxFull = async (currentPosition) => {
//     return currentPosition.currentRow === 'I' && currentPosition.currentColumn === 9;
// };

// // Create storage function
// export const createStorage = async (req, res) => {
//     try {
//         // Check if the sampleId already exists in the database
//         const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
//         if (existingStorage) {
//             return res.status(400).json({ message: 'SampleId already exists' });
//         }

//         // Retrieve the current position from the database
//         let currentPosition = await getCurrentPosition();

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         // Calculate compartment, rage, and tray based on current position
//         const { compartment, rage, tray } = calculateCompartmentRageTray(currentPosition);

//         // Append 'A' & 'B' to the sampleId for the urinePallet 
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         // Check if the current box is full
//         const isBoxFull = await isCurrentBoxFull(currentPosition);

//         // Increment boxNumber for the current box
//         let boxNumber = 1;

//         if (isBoxFull) {
//             // If box is full, increment boxNumber
//             boxNumber++;
//             if (boxNumber > 4) {
//                 // If all boxes in tray are filled, increment tray count
//                 await incrementTrayCount();
//                 if (await isCurrentTrayFull()) {
//                     // If current tray is full, reset boxNumber and increment compartment count
//                     boxNumber = 1;
//                     await incrementCompartmentCount();
//                 }
//             }
//         }

//         // Create new CSS storage entry
//         const newStorage = new CSS({
//             sampleId: req.body.sampleId,
//             visitName: req.body.visitName,
//             sampleType: req.body.sampleType,
//             roomNumber: req.body.roomNumber,
//             freezerNumber: req.body.freezerNumber,
//             tray: currentRageNumber, // Changed to currentRageNumber
//             boxNumber,
//             row: currentPosition.currentRow,
//             column: currentPosition.currentColumn,
//             compartment,
//             rage,
//             urinePalletA: sampleIdWithA,
//             urinePalletB: sampleIdWithB,
//             dnaExtration: req.body.dnaExtration,
//             comments: req.body.comments,
//             dateOfEntry: req.body.dateOfEntry,
//             entryDoneBy: req.body.entryDoneBy,
//         });

//         // Save new storage entry
//         const savedStorage = await newStorage.save();

//         // Move to the next row and column
//         if (currentPosition.currentColumn === 9) {
//             currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
//             currentPosition.currentColumn = 1; // Reset column to 1
//         } else {
//             currentPosition.currentColumn++; // Move to the next column
//         }

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         // Increment consecutive requests count
//         consecutiveRequests++;

//         // Check if compartment is completed
//         if (compartmentCompleted) {
//             await incrementCompartmentCount();
//         }

//         // Check if 81 consecutive requests have been made
//         if (consecutiveRequests === 81) {
//             // Reset consecutiveRequests count
//             consecutiveRequests = 0;
//             // Increment tray count
//             await incrementRageCount();
//         }

//         // Redirect to success page after storing data
//         res.status(201).render('storage-success/css');
//         console.log(savedStorage);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };


