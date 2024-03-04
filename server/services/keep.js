// import CSS from '../models/css.js';
// import dotenv from 'dotenv';
// dotenv.config();

// // Create Cross-sectional Survey-CSS
// let currentRow = 'A';
// let currentColumn = 1;

// export const createStorage = async (req, res) => {
//   try {
//     // Append 'A' to the sampleId
//     const sampleIdWithA = req.body.sampleId + 'A';
//     const sampleIdWithB = req.body.sampleId + 'B';

//     const newStorage = new CSS({
//       sampleId: req.body.sampleId,
//       visitName: req.body.visitName,
//       sampleType: req.body.sampleType,
//       roomNumber: req.body.roomNumber,
//       boxNumber: req.body.boxNumber,
//       row: currentRow,
//       column: currentColumn,
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

//     // Move to the next row and column
//     if (currentColumn === 9) {
//       currentRow = String.fromCharCode(currentRow.charCodeAt(0) + 1); // Move to the next row
//       currentColumn = 1; // Reset column to 1
//     } else {
//       currentColumn++; // Move to the next column
//     }

//     // res.status(201).json({ message: "Storage created successfully", savedStorage, markedBox: { row: currentRow, column: currentColumn } });
//     res.status(201).render('storage-success/css');
//     console.log(savedStorage);
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// }