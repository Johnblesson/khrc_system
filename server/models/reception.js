import mongoose from 'mongoose';

const { Schema } = mongoose;

const receptionSchema = new Schema({
  studyName: String,
  sampleId: { type: String, required: true, unique: true },
  visitName: String,
  visitDate: Date,
  sampleType: String,
  sampleQuality: String,
  rejectionReason: String,
  ageAtVisit: String,
  dateSampleCollection: Date,
  timeOfSampleCollection: String,
  dateOfSampleReceipt: Date,
  timeOfSampleReceipt: String,
  comments: String,
  dateOfEntry: Date,
  entryDoneBy: String,
}, {
  timestamps: true,
});

const RECEPTION = mongoose.model('reception', receptionSchema);

export default RECEPTION;