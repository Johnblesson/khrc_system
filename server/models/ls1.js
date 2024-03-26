import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
  sampleId: String,
  visitName: String,
  sampleType: String,
  roomNumber: String,
  freezerNumber: String,
  boxNumber: String,
  row: String,
  column: String,
  compartment: String,
  rage: String,
  tray: String,
  urinePalletA: String,
  urinePalletB: String,
  dnaExtration: String,
  comments: String,
  dateOfEntry: Date,
  entryDoneBy: String,
}, {
  timestamps: true,
});

const LS1 = mongoose.model('LS1-storages', sampleReceiptSchema);

export default LS1;