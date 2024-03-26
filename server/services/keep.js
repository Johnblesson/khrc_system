import CSS from '../../models/css.js';
import RECEPTION from '../../models/reception.js';
import dotenv from 'dotenv';
import Position from '../../models/position/css.js';
import { getCurrentPosition, updatePosition } from '../positions/css.js';
dotenv.config();

// Function to generate storage positions
const generateStoragePositions = () => {
    const freezerNumber = 1;
    const compartmentsPerFreezer = 4;
    const ragesPerCompartment = 5;
    const traysPerRage = 4;
    const boxesPerTray = 4;
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    const storagePositions = [];
    
    for (let compartment = 1; compartment <= compartmentsPerFreezer; compartment++) {
        for (let rage = 1; rage <= ragesPerCompartment; rage++) {
            for (let tray = 1; tray <= traysPerRage; tray++) {
                for (let box = 1; box <= boxesPerTray; box++) {
                    for (let row of rows) {
                        for (let column of columns) {
                            storagePositions.push({
                                freezerNumber,
                                compartment,
                                rage,
                                tray,
                                box,
                                row,
                                column
                            });
                        }
                    }
                }
            }
        }
    }
    
    return storagePositions;
};

// Create Cross-sectional Survey-CSS
let currentRow = 'A';
let currentColumn = 1;

// Create storage function
export const createStorage = async (req, res) => {
  try {
     // Check if the sampleId already exists in the database
     const existingStorage = await CSS.findOne({ sampleId: req.body.sampleId });
     if (existingStorage) {
       return res.status(400).json({ message: 'SampleId already exists' });
     }
     
    // Retrieve the current position from the database
    const currentPosition = await getCurrentPosition();

    // Append 'A' to the sampleId
    const sampleIdWithA = req.body.sampleId + 'A';
    const sampleIdWithB = req.body.sampleId + 'B';

    const newStorage = new CSS({
      sampleId: req.body.sampleId,
      visitName: req.body.visitName,
      sampleType: req.body.sampleType,
      roomNumber: req.body.roomNumber,
      freezerNumber: req.body.freezerNumber,
      tray: req.body.tray,
      boxNumber: req.body.boxNumber,
      row: currentPosition.currentRow,
      column: currentPosition.currentColumn,
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
    if (currentPosition.currentColumn === 9) {
      currentPosition.currentRow = String.fromCharCode(currentPosition.currentRow.charCodeAt(0) + 1); // Move to the next row
      currentPosition.currentColumn = 1; // Reset column to 1
    } else {
      currentPosition.currentColumn++; // Move to the next column
    }

    // Update the current row and column values in the database
    await updatePosition(currentPosition.currentRow, currentPosition.currentColumn);

    res.status(201).render('storage-success/css');
    console.log(savedStorage);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};