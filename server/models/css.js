import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleReceiptSchema = new Schema({
  sampleId: String,
  visitName: String,
  sampleType: { type: String, default: 'Urine' },
  roomNumber: { type: String },
  boxNumber: { type: String },
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
  // user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming there is a User model
}, {
  timestamps: true,
});

const CSS = mongoose.model('CSS-storages', sampleReceiptSchema);

export default CSS;

