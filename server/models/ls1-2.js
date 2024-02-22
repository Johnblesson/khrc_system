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
  // storageReception: { type: Schema.Types.ObjectId, ref: 'storageReception' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming there is a User model
}, {
  timestamps: true,
});

const LS1_2ND = mongoose.model('LS1_2ND-storages', sampleReceiptSchema);

export default LS1_2ND;