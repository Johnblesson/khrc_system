// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const sampleReceiptSchema = new Schema({
//   sampleId: String,
//   visitName: String,
//   sampleType: { type: String, default: 'Urine' },
//   roomNumber: String,
//   freezerNumber: String,
//   boxNumber: String,
//   row: String,
//   column: String,
//   compartment: String,
//   rage: String,
//   tray: String,
//   urinePalletA: String,
//   urinePalletB: String,
//   dnaExtration: String,
//   comments: String,
//   dateOfEntry: Date,
//   entryDoneBy: String,
// }, {
//   timestamps: true,
// });

// const CSS = mongoose.model('CSS-storages', sampleReceiptSchema);

// export default CSS;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
    sampleId: String,
    visitName: String,
    sampleType: { type: String, default: 'Urine' },
    roomNumber: { type: Number, default: 1 },
    freezerNumber: String,
    boxNumber: Number,
    row: String,
    column: String,
    compartment: Number,
    rage: Number,
    tray: Number,
    urinePalletA: String,
    urinePalletB: String,
    dnaExtration: String,
    comments: String,
    dateOfEntry: Date,
    entryDoneBy: String,
    
}, {
    timestamps: true,
});

const CSS = mongoose.model('CSS-storages', sampleReceiptSchema);

export default CSS;
