import mongoose from 'mongoose';

const { Schema } = mongoose;

const receptionSchema = new Schema({
  studyName: String,
  subject: String,
  visitName: String,
  visitDate: Date,
  sampleType: String,
  ageAtVisit: String,
  dateSampleCollection: Date,
  timeOfSampleCollection: String, // Use String for TIME, or consider using Date and parsing it accordingly
  dateOfSampleReceipt: Date,
  timeOfSampleReceipt: String, // Use String for TIME, or consider using Date and parsing it accordingly
  comments: String,
  dateOfEntry: Date,
  entryDoneBy: String,
  // storageReception: { type: Schema.Types.ObjectId, ref: 'storageReception' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming there is a User model
}, {
  timestamps: true,
});

const RECEPTION = mongoose.model('reception', receptionSchema);

export default RECEPTION;