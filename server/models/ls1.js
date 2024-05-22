// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const sampleReceiptSchema = new Schema({
//   sampleId: String,
//   visitName: String,
//   sampleType: String,
//   roomNumber: String,
//   freezerNumber: String,
//   boxNumber: String,
//   row: String,
//   column: String,
//   compartment: String,
//   rack: String,
//   tray: String,
//   urinePalletA: String,
//   urinePalletB: String,
//   dnaExtration: String,
//   comments: String,
//   dateOfEntry: Date,
//   entryDoneBy: String,
//   slotNumber : Number
// }, {
//   timestamps: true,
// });

// const LS1 = mongoose.model('LS1-storages', sampleReceiptSchema);

// export default LS1;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
    sampleId: { type: String, required: true },
    visitName: { type: String, required: true },
    sampleType: { type: String, default: 'SCVS' },
    roomNumber: { type: Number, default: 1 },
    freezerNumber: { type: String, required: true },
    boxNumber: {
        type: Number,
        default: 0,
        set: v => isNaN(v) ? 0 : v,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    row: { type: String, required: true },
    column: { type: String, required: true },
    compartment: {
        type: Number,
        default: 0,
        set: v => isNaN(v) ? 0 : v,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    rack: {
        type: Number,
        default: 0,
        set: v => isNaN(v) ? 0 : v,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    tray: {
        type: Number,
        default: 0,
        set: v => isNaN(v) ? 0 : v,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    urinePalletA: { type: String, required: true },
    urinePalletB: { type: String, required: true },
    dnaExtration: { type: String, required: true },
    comments: { type: String, default: 'No comments' },
    dateOfEntry: { type: Date, default: Date.now },
    entryDoneBy: { type: String, required: true },
    slotNumber: {
        type: Number,
        default: 0,
        set: v => isNaN(v) ? 0 : v,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
}, {
    timestamps: true,
});

const LS1 = mongoose.model('LS1-storages', sampleReceiptSchema);

export default LS1;