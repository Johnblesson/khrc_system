import LS1_2ND from '../models/ls1-2.js';
import dotenv from 'dotenv';
dotenv.config();

// LS2 Storage
export const createStorage = async (req, res) => {
  try {
     // Append 'A' to the sampleId
     const sampleIdWithA = req.body.sampleId + 'A';
     const sampleIdWithB = req.body.sampleId + 'B';

    const newStorage = new LS1_2ND({
        sampleId: req.body.sampleId,
        visitName: req.body.visitName,
        sampleType: req.body.sampleType,
        roomNumber: req.body.roomNumber,
        boxNumber: req.body.boxNumber,
        row: req.body.row,
        column: req.body.column,
        compartment: req.body.compartment,
        rage: req.body.rage,
        urinePalletA: sampleIdWithA,
        urinePalletB: sampleIdWithB,
        dnaExtration: req.body.dnaExtration,
        comments: req.body.comments,
        dateOfEntry: req.body.dateOfEntry,
        entryDoneBy: req.body.entryDoneBy,
        // user_id: req.body.user_id,
        });
    // const newStorage = await LS1_2ND.create(req.body);

    const savedStorage = await newStorage.save();
    res.status(201).render('storage-success');
    // res.json({ message: "Storage created successfully", savedStorage})
    // res.status(201).json(savedStorage);
    console.log(savedStorage);

  } catch (error) {
    return res.status(500).json({
      message: error,
  });
}
}

// Get LS1_2ND
export const getStorage = async (req, res) => {
    try {
  
      const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
      const limit = 3; // Number of entries per page
      const skip = (page - 1) * limit;
  
      // Fetch all storage data
      // const allStorage = await RECEPTION.find();
      const allStorage = await LS1_2ND.find().skip(skip).limit(limit);
      const totalEntries = await LS1_2ND.countDocuments();
  
      const totalPages = Math.ceil(totalEntries / limit);
      // const allStorage = await LS1_2ND.find();
  
      // Fetch the most recent storage data
      const latestStorage = await LS1_2ND.findOne().sort({ _id: -1 });
  
     res.render('all-ls1-2', { 
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

// retrieve and return all users/ retrive and return a single user
export const findStorage = (req, res)=>{

  if(req.query.id){
      const id = req.query.id;

      LS2.findById(id)
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
      LS2.find()
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
  LS2.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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

  LS2.findByIdAndDelete(id)
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

export const ls1_2_View = async (req, res) => {
    try {
      const storage = await LS1_2ND.findOne({ _id: req.params.id });
  
      const locals = {
        title: "KHRC",
         description: "Kambia Health Research Center KHRC System",
      };
  
      res.render("view-ls1-2", {
        locals,
        storage,
      });
    } catch (error) {
      console.log(error);
    }
  };