import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
  sampleId: String,
  visitName: String,
  sampleType: { type: String, default: 'Urine' },
  roomNumber: { type: String },
  boxNumber: { type: String },
  row: String,
  column: String, // Remove unique constraint
  compartment: String,
  rage: String,
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

