// import CSS from '../../models/css.js';
import RECEPTION from '../../models/reception.js';
// import dotenv from 'dotenv';
// import Position from '../../models/position/css.js';
// import { getCurrentPosition, updatePosition } from '../positions/css.js';
// dotenv.config();

// // Create Cross-sectional Survey-CSS
// let currentRow = 'A';
// let currentColumn = 1;

// // Create storage function
// export const createStorage = async (req, res) => {
//   try {
//      // Check if the sampleId already exists in the database
//      const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
//      if (existingStorage) {
//        return res.status(400).json({ message: 'SampleId already exists' });
//      }
     
//     // Retrieve the current position from the database
//     const currentPosition = await getCurrentPosition();

//     // Append 'A' to the sampleId
//     const sampleIdWithA = req.body.sampleId + 'A';
//     const sampleIdWithB = req.body.sampleId + 'B';

//     const newStorage = new CSS({
//       sampleId: req.body.sampleId,
//       visitName: req.body.visitName,
//       sampleType: req.body.sampleType,
//       roomNumber: req.body.roomNumber,
//       freezerNumber: req.body.freezerNumber,
//       tray: req.body.tray,
//       boxNumber: req.body.boxNumber,
//       row: currentPosition.currentRow,
//       column: currentPosition.currentColumn,
//       compartment: req.body.compartment,
//       rage: req.body.rage,
//       urinePalletA: sampleIdWithA,
//       urinePalletB: sampleIdWithB,
//       dnaExtration: req.body.dnaExtration,
//       comments: req.body.comments,
//       dateOfEntry: req.body.dateOfEntry,
//       entryDoneBy: req.body.entryDoneBy,
//     });

//     const savedStorage = await newStorage.save();

    // // Move to the next row and column
    // if (currentPosition.currentColumn === 9) {
    //   currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
    //   currentPosition.currentColumn = 1; // Reset column to 1
    // } else {
    //   currentPosition.currentColumn++; // Move to the next column
    // }

    // // Update the current row and column values in the database
    // await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//     res.status(201).render('storage-success/css');
//     console.log(savedStorage);
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };


// import CSS from '../../models/css.js';
// import RECEPTION from '../../models/reception.js';
// import dotenv from 'dotenv';
// import Position from '../../models/position/css.js';
// import { getCurrentPosition, updatePosition } from '../positions/css.js';
// dotenv.config();

// // Create Cross-sectional Survey-CSS
// let currentRow = 'A';
// let currentColumn = 1;

// // Function to calculate compartment, rage, and tray based on current position
// const calculateCompartmentRageTray = (currentPosition) => {
//     const compartmentsPerFreezer = 4;
//     const ragesPerCompartment = 5;
//     const traysPerRage = 4;

//     const totalPositions = compartmentsPerFreezer * ragesPerCompartment * traysPerRage;
//     const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

//     const compartment = Math.floor(currentPositionIndex / (ragesPerCompartment * traysPerRage)) + 1;
//     const remainingPositions = currentPositionIndex % (ragesPerCompartment * traysPerRage);
//     const rage = Math.floor(remainingPositions / traysPerRage) + 1;
//     const tray = (remainingPositions % traysPerRage) + 1;

//     return { compartment, rage, tray };
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
//         const currentPosition = await getCurrentPosition();

//         // Calculate compartment, rage, and tray based on current position
//         const { compartment, rage, tray } = calculateCompartmentRageTray(currentPosition);

//         // Append 'A' to the sampleId
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         const newStorage = new CSS({
//             sampleId: req.body.sampleId,
//             visitName: req.body.visitName,
//             sampleType: req.body.sampleType,
//             roomNumber: req.body.roomNumber,
//             freezerNumber: req.body.freezerNumber,
//             tray,
//             boxNumber: req.body.boxNumber,
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
//             currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
//             currentPosition.currentColumn = 1; // Reset column to 1
//         } else {
//             currentPosition.currentColumn++; // Move to the next column
//         }

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         res.status(201).render('storage-success/css');
//         console.log(savedStorage);
//     } catch (error) {
//         return res.status(500).json({ message: error });
//     }
// };


// import CSS from '../../models/css.js';
// import dotenv from 'dotenv';
// import Position from '../../models/position/css.js';
// import { getCurrentPosition, updatePosition } from '../positions/css.js';

// dotenv.config();

// // Function to calculate compartment, rage, and tray based on current position
// const calculateCompartmentRageTray = (currentPosition) => {
//     const compartmentsPerFreezer = 4;
//     const ragesPerCompartment = 5;
//     const traysPerRage = 4;

//     const totalPositions = compartmentsPerFreezer * ragesPerCompartment * traysPerRage;
//     const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

//     const compartment = Math.floor(currentPositionIndex / (ragesPerCompartment * traysPerRage)) + 1;
//     const remainingPositions = currentPositionIndex % (ragesPerCompartment * traysPerRage);
//     const rage = Math.floor(remainingPositions / traysPerRage) + 1;
//     const tray = (remainingPositions % traysPerRage) + 1;

//     return { compartment, rage, tray };
// };

// // Function to check if the current tray is full
// const isCurrentTrayFull = async (currentPosition) => {
//     // Check if the current column is greater than 9
//     return currentPosition.currentColumn > 9;
// };

// // Function to get the next boxNumber for the current tray
// const getNextBoxNumber = async (currentPosition) => {
//     // Determine the boxNumber based on the current column (1 to 9)
//     return currentPosition.currentColumn % 9 === 0 ? 2 : 1;
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

//         // Append 'A' to the sampleId
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         // Check if the current tray is full
//         const isTrayFull = await isCurrentTrayFull(currentPosition);

//         // Generate the boxNumber based on the current tray
//         let boxNumber;
//         if (isTrayFull) {
//             // Move to the next tray
//             currentPosition.currentRow = currentPosition.currentRow === 'I' ? 'A' : String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Reset row or move to the next row
//             currentPosition.currentColumn = 1; // Reset column to 1
//             // Determine the boxNumber for the new tray
//             boxNumber = await getNextBoxNumber(currentPosition);
//         } else {
//             // Increment boxNumber for the current tray
//             boxNumber = await getNextBoxNumber(currentPosition);
//         }

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

//         const savedStorage = await newStorage.save();

//         // Move to the next column
//         if (!isTrayFull) {
//             currentPosition.currentColumn++; // Move to the next column
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


// import CSS from '../../models/css.js';
// import dotenv from 'dotenv';
// import Position from '../../models/position/css.js';
// import { getCurrentPosition, updatePosition } from '../positions/css.js';

// dotenv.config();

// // Global variable to track the number of consecutive requests
// let consecutiveRequests = 0;

// // Function to calculate compartment, rage, and tray based on current position
// const calculateCompartmentRageTray = (currentPosition) => {
//     const compartmentsPerFreezer = 4;
//     const ragesPerCompartment = 5;
//     const traysPerRage = 4;

//     const totalPositions = compartmentsPerFreezer * ragesPerCompartment * traysPerRage;
//     const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

//     const compartment = Math.floor(currentPositionIndex / (ragesPerCompartment * traysPerRage)) + 1;
//     const remainingPositions = currentPositionIndex % (ragesPerCompartment * traysPerRage);
//     const rage = Math.floor(remainingPositions / traysPerRage) + 1;
//     const tray = (remainingPositions % traysPerRage) + 1;

//     return { compartment, rage, tray };
// };

// // Function to check if the current tray is full
// const isCurrentTrayFull = async (currentPosition) => {
//     // Check if the current column is greater than 9
//     return currentPosition.currentColumn > 9;
// };

// // Function to get the next boxNumber for the current tray
// const getNextBoxNumber = async (currentPosition) => {
//     // Determine the boxNumber based on the current column (1 to 9)
//     return currentPosition.currentColumn % 9 === 0 ? 2 : 1;
// };

// // Function to handle incrementing the tray count
// const incrementTrayCount = async () => {
//     consecutiveRequests++;
//     // Check if 81 consecutive requests have been made
//     if (consecutiveRequests === 81) {
//         // Reset consecutiveRequests count
//         consecutiveRequests = 0;
//         // Increment tray count here
//         // (This part should be implemented according to your specific logic)
//     }
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

//         // Append 'A' to the sampleId
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         // Check if the current tray is full
//         const isTrayFull = await isCurrentTrayFull(currentPosition);

//         // Generate the boxNumber based on the current tray
//         let boxNumber;
//         if (isTrayFull) {
//             // Move to the next tray
//             currentPosition.currentRow = currentPosition.currentRow === 'I' ? 'A' : String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Reset row or move to the next row
//             currentPosition.currentColumn = 1; // Reset column to 1
//             // Determine the boxNumber for the new tray
//             boxNumber = await getNextBoxNumber(currentPosition);
//             // Increment tray count
//             await incrementTrayCount();
//         } else {
//             // Increment boxNumber for the current tray
//             boxNumber = await getNextBoxNumber(currentPosition);
//         }

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

//         const savedStorage = await newStorage.save();

//         // Move to the next column
//         if (!isTrayFull) {
//             currentPosition.currentColumn++; // Move to the next column
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


// import CSS from '../../models/css.js';
// import dotenv from 'dotenv';
// import Position from '../../models/position/css.js';
// import { getCurrentPosition, updatePosition } from '../positions/css.js';

// dotenv.config();

// // Global variable to track the number of consecutive requests
// let consecutiveRequests = 0;

// // Global variable to track the number of completed requests
// let completedRequests = 0;

// // Function to calculate compartment, rage, and tray based on current position
// const calculateCompartmentRageTray = (currentPosition) => {
//     const compartmentsPerFreezer = 4;
//     const ragesPerCompartment = 5;
//     const traysPerRage = 4;

//     const totalPositions = compartmentsPerFreezer * ragesPerCompartment * traysPerRage;
//     const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

//     const compartment = Math.floor(currentPositionIndex / (ragesPerCompartment * traysPerRage)) + 1;
//     const remainingPositions = currentPositionIndex % (ragesPerCompartment * traysPerRage);
//     const rage = Math.floor(remainingPositions / traysPerRage) + 1;
//     const tray = (remainingPositions % traysPerRage) + 1;

//     return { compartment, rage, tray };
// };

// // Function to check if the current tray is full
// const isCurrentTrayFull = async (currentPosition) => {
//     // Check if the current column is greater than 9
//     return currentPosition.currentColumn > 9;
// };

// // Function to get the next boxNumber for the current tray
// const getNextBoxNumber = async (currentPosition) => {
//     // Determine the boxNumber based on the current column (1 to 9)
//     return currentPosition.currentColumn % 9 === 0 ? 2 : 1;
// };

// // Function to handle incrementing the tray count
// const incrementTrayCount = async () => {
//     // Increment tray count here
//     // (This part should be implemented according to your specific logic)
//     console.log('Tray incremented!');
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

//         // Append 'A' to the sampleId
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         // Check if the current tray is full
//         const isTrayFull = await isCurrentTrayFull(currentPosition);

//         // Generate the boxNumber based on the current tray
//         let boxNumber;
//         if (isTrayFull) {
//             // Move to the next tray
//             currentPosition.currentRow = currentPosition.currentRow === 'I' ? 'A' : String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Reset row or move to the next row
//             currentPosition.currentColumn = 1; // Reset column to 1
//             // Determine the boxNumber for the new tray
//             boxNumber = await getNextBoxNumber(currentPosition);
//             // Increment tray count
//             await incrementTrayCount();
//         } else {
//             // Increment boxNumber for the current tray
//             boxNumber = await getNextBoxNumber(currentPosition);
//         }

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

//         const savedStorage = await newStorage.save();

//         // Move to the next column
//         if (!isTrayFull) {
//             currentPosition.currentColumn++; // Move to the next column
//         }

//         // Update the current row and column values in the database
//         await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

//         // Increment consecutive requests count
//         consecutiveRequests++;
        
//         // Increment completed requests count if a box is completed
//         if (!isTrayFull) {
//             completedRequests++;
//         }

//         // Check if 81 consecutive requests have been made
//         if (consecutiveRequests === 81) {
//             // Reset consecutiveRequests count
//             consecutiveRequests = 0;
//             // Check if 81 requests have completed
//             if (completedRequests === 81) {
//                 // Increment tray count after 81 completed requests
//                 await incrementTrayCount();
//                 // Reset completed requests count
//                 completedRequests = 0;
//             }
//         }

//         // Redirect to success page after storing data
//         res.status(201).render('storage-success/css');
//         console.log(savedStorage);
//     } catch (error) {
//         return res.status(500).json({ message: error });
//     }
// };


import CSS from '../../models/css.js';
import dotenv from 'dotenv';
import Position from '../../models/position/css.js';
import { getCurrentPosition, updatePosition } from '../positions/css.js';
dotenv.config();

// Global variable to track the number of consecutive requests
let consecutiveRequests = 0;

// Global variable to track the current tray number
let currentTrayNumber = 1;

// Function to calculate compartment, rage, and tray based on current position
const calculateCompartmentRageTray = (currentPosition) => {
    const compartmentsPerFreezer = 4;
    const ragesPerCompartment = 5;
    const traysPerRage = 4;

    const totalPositions = compartmentsPerFreezer * ragesPerCompartment * traysPerRage;
    const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

    const compartment = Math.floor(currentPositionIndex / (ragesPerCompartment * traysPerRage)) + 1;
    const remainingPositions = currentPositionIndex % (ragesPerCompartment * traysPerRage);
    const rage = Math.floor(remainingPositions / traysPerRage) + 1;
    const tray = (remainingPositions % traysPerRage) + 1;

    return { compartment, rage, tray };
};

// Function to check if the current tray is full
const isCurrentTrayFull = async (currentPosition) => {
    // Check if the current column is greater than 9
    return currentPosition.currentColumn > 9;
};

// Function to get the next boxNumber for the current tray
const getNextBoxNumber = async (currentPosition) => {
    // Determine the boxNumber based on the current column (1 to 9)
    return currentPosition.currentColumn % 9 === 0 ? 2 : 1;
};

// Function to handle incrementing the tray count
const incrementTrayCount = async () => {
    currentTrayNumber++;
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

        // Append 'A' to the sampleId
        const sampleIdWithA = req.body.sampleId + 'A';
        const sampleIdWithB = req.body.sampleId + 'B';

        // Check if the current tray is full
        const isTrayFull = await isCurrentTrayFull(currentPosition);

        // Generate the boxNumber based on the current tray
        let boxNumber;
        if (isTrayFull) {
            // Move to the next tray
            currentPosition.currentRow = currentPosition.currentRow === 'I' ? 'A' : String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Reset row or move to the next row
            currentPosition.currentColumn = 1; // Reset column to 1
            // Determine the boxNumber for the new tray
            boxNumber = await getNextBoxNumber(currentPosition);
            // Increment tray count
            await incrementTrayCount();
        } else {
            // Increment boxNumber for the current tray
            boxNumber = await getNextBoxNumber(currentPosition);
        }

        const newStorage = new CSS({
            sampleId: req.body.sampleId,
            visitName: req.body.visitName,
            sampleType: req.body.sampleType,
            roomNumber: req.body.roomNumber,
            freezerNumber: req.body.freezerNumber,
            tray: currentTrayNumber, // Assign current tray number
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

        const savedStorage = await newStorage.save();

        // Move to the next column
        if (!isTrayFull) {
            currentPosition.currentColumn++; // Move to the next column
        }

        // Update the current row and column values in the database
        await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

        // Increment consecutive requests count
        consecutiveRequests++;

        // Check if 81 consecutive requests have been made
        if (consecutiveRequests === 81) {
            // Reset consecutiveRequests count
            consecutiveRequests = 0;
            // Increment tray count
            await incrementTrayCount();
        }

        // Redirect to success page after storing data
        res.status(201).render('storage-success/css');
        console.log(savedStorage);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

// import CSS from '../../models/css.js';
// import dotenv from 'dotenv';
// import Position from '../../models/position/css.js';
// import { getCurrentPosition, updatePosition } from '../positions/css.js';
// dotenv.config();

// // Global variable to track the number of consecutive requests
// let consecutiveRequests = 0;

// // Global variable to track the current tray number
// let currentTrayNumber = 1;

// // Function to calculate compartment, rage, and tray based on current position
// const calculateCompartmentRageTray = (currentPosition) => {
//     const compartmentsPerFreezer = 4;
//     const ragesPerCompartment = 5;
//     const traysPerRage = 4;

//     const totalPositions = compartmentsPerFreezer * ragesPerCompartment * traysPerRage;
//     const currentPositionIndex = (currentPosition.currentRow.charCodeAt(0) - 'A'.charCodeAt(0)) * 9 + currentPosition.currentColumn - 1;

//     const compartment = Math.floor(currentPositionIndex / (ragesPerCompartment * traysPerRage)) + 1;
//     const remainingPositions = currentPositionIndex % (ragesPerCompartment * traysPerRage);
//     const rage = Math.floor(remainingPositions / traysPerRage) + 1;
//     const tray = (remainingPositions % traysPerRage) + 1;

//     return { compartment, rage, tray };
// };

// // Function to check if the current tray is full
// const isCurrentTrayFull = async (currentPosition) => {
//     // Check if the current column is greater than 9
//     return currentPosition.currentColumn > 9;
// };

// // Function to get the next boxNumber for the current tray
// const getNextBoxNumber = async (currentPosition) => {
//     // Determine the boxNumber based on the current column (1 to 9)
//     return currentPosition.currentColumn % 9 === 0 ? 2 : 1;
// };

// // Function to handle incrementing the tray count
// const incrementTrayCount = async () => {
//     currentTrayNumber++;
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

//         // Append 'A' to the sampleId
//         const sampleIdWithA = req.body.sampleId + 'A';
//         const sampleIdWithB = req.body.sampleId + 'B';

//         // Check if the current tray is full
//         const isTrayFull = await isCurrentTrayFull(currentPosition);

//         // Generate the boxNumber based on the current tray
//         let boxNumber;
//         if (isTrayFull) {
//             // Move to the next tray
//             currentPosition.currentRow = currentPosition.currentRow === 'I' ? 'A' : String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Reset row or move to the next row
//             currentPosition.currentColumn = 1; // Reset column to 1
//             // Determine the boxNumber for the new tray
//             boxNumber = await getNextBoxNumber(currentPosition);
//             // Increment tray count
//             await incrementTrayCount();
//         } else {
//             // Increment boxNumber for the current tray
//             boxNumber = await getNextBoxNumber(currentPosition);
//         }

//         const newStorage = new CSS({
//             sampleId: req.body.sampleId,
//             visitName: req.body.visitName,
//             sampleType: req.body.sampleType,
//             roomNumber: req.body.roomNumber,
//             freezerNumber: req.body.freezerNumber,
//             tray: currentTrayNumber, // Assign current tray number
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

//         // Move to the next column
//         if (!isTrayFull) {
//             currentPosition.currentColumn++; // Move to the next column
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