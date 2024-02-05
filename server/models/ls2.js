import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
  sampleId: String,
  visitName: String,
  sampleType: { type: String, default: 'SCVS' },
  roomNumber: { type: String, require: true },
  boxNumber: { type: String, require: true },
  row: { type: String, require: true },
  column: { type: String, require: true},
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

const LS2 = mongoose.model('LS2-storages', sampleReceiptSchema);

export default LS2;