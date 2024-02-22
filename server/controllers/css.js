// import fs from 'fs';
// import path from 'path';
import CSS from '../models/css.js';
import dotenv from 'dotenv';
dotenv.config();

// Create Cross-sectional Survey-CSS
// export const createStorage = async (req, res) => {
//   try {

//     // Append 'A' to the sampleId
//     const sampleIdWithA = req.body.sampleId + 'A';
//     const sampleIdWithB = req.body.sampleId + 'B';

//     const newStorage = new CSS({
//         sampleId: req.body.sampleId,
//         visitName: req.body.visitName,
//         sampleType: req.body.sampleType,
//         roomNumber: req.body.roomNumber,
//         boxNumber: req.body.boxNumber,
//         row: req.body.row,
//         column: req.body.column,
//         compartment: req.body.compartment,  
//         rage: req.body.rage,
//         urinePalletA: sampleIdWithA,
//         urinePalletB: sampleIdWithB,
//         dnaExtration: req.body.dnaExtration,
//         comments: req.body.comments,
//         dateOfEntry: req.body.dateOfEntry,
//         entryDoneBy: req.body.entryDoneBy,
//         // user_id: req.body.user_id,
//         });
// // const newStorage = await CSS.create(req.body);
//     const savedStorage = await newStorage.save();
//     res.status(201).render('storage-success');
//     // res.json({ message: "Storage created successfully", savedStorage})
//     // res.status(201).json(savedStorage);
//     console.log(savedStorage);

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while creating a storage.');
//   }
// };




// Create Cross-sectional Survey-CSS
let currentRow = 'A';
let currentColumn = 1;

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

    // Send the row and column information in the response
    // res.status(201).json({ message: "Storage created successfully", savedStorage, markedBox: { row: currentRow, column: currentColumn } });
    res.status(201).render('storage-success');
    console.log(savedStorage);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}




// Get the directory path of the current file
// const currentDir = new URL('.', import.meta.url).pathname;

// // Path to the file where the currentRow and currentColumn values will be stored
// const sequenceFilePath = path.join(currentDir, 'sequence.json');

// // Initialize currentRow and currentColumn variables
// let currentRow = 'A';
// let currentColumn = 1;

// // Check if the sequence file exists
// if (fs.existsSync(sequenceFilePath)) {
//   // If the file exists, load the values of currentRow and currentColumn from the file
//   const sequenceData = fs.readFileSync(sequenceFilePath, 'utf8');
//   const { row, column } = JSON.parse(sequenceData);
//   currentRow = row;
//   currentColumn = column;
// }

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


//     // Move to the next row and column
//     if (currentColumn === 9) {
//       currentRow = String.fromCharCode(currentRow.charCodeAt(0) + 1); // Move to the next row
//       currentColumn = 1; // Reset column to 1
//     } else {
//       currentColumn++; // Move to the next column
//     }

//     // Save the updated sequence values to the file
//     fs.writeFileSync(sequenceFilePath, JSON.stringify({ row: currentRow, column: currentColumn }));

//     const savedStorage = await newStorage.save();

//     // Send the row and column information in the response
//     // res.status(201).json({ message: "Storage created successfully", savedStorage, markedBox: { row: currentRow, column: currentColumn } });
//     res.status(201).render('storage-success');
//     console.log(savedStorage);
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// }





// Get Cross-sectional Survey-CSS
export const getStorage = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
    const limit = 5; // Number of entries per page
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

   res.render('css_see_more', { 
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

// Delete a user with specified user id in the request
export const deleteStorage = (req, res)=>{
  const id = req.params.id;

  CSS.findByIdAndDelete(id)
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
          }else{
              res.send({
                  message : "User was deleted successfully!"
              })
          }
      })
      .catch(err =>{
          res.status(500).send({
              message: "Could not delete User with id=" + id
          });
      });
}

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
  
