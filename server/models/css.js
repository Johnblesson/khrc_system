// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const sampleReceiptSchema = new Schema({
//     sampleId: String,
//     visitName: String,
//     sampleType: { type: String, default: 'Urine' },
//     roomNumber: { type: Number, default: 1 },
//     freezerNumber: String,
//     boxNumber: Number,
//     row: String,
//     column: String,
//     compartment: Number,
//     rack: Number,
//     tray: Number,
//     urinePalletA: String,
//     urinePalletB: String,
//     dnaExtration: String,
//     comments: String,
//     dateOfEntry: Date,
//     entryDoneBy: String,
//     slotNumber : Number
// }, {
//     timestamps: true,
// });

// const CSS = mongoose.model('CSS-storages', sampleReceiptSchema);

// export default CSS;



import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
    sampleId: { type: String, required: true },
    visitName: { type: String, required: true },
    sampleType: { type: String, default: 'Urine' },
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
    comments: { type: String, required: true },
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

const CSS = mongoose.model('CSS-storages', sampleReceiptSchema);

export default CSS;
