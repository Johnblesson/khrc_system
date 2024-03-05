import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
  sampleId: String,
  visitName: String,
  sampleType: { type: String, default: 'SCVS' },
  roomNumber: String,
  boxNumber: String,
  row: String,
  column: String,
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

const LS2 = mongoose.model('LS2-storages', sampleReceiptSchema);

export default LS2;