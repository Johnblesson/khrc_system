import mongoose from "mongoose";

// Create a schema for storing the current row and column values
const positionSchema = new mongoose.Schema({
  currentRow: String,
  currentColumn: Number,
});

// Create a model based on the schema
const ls12Position = mongoose.model('ls1_2ND-Position', positionSchema);

export default ls12Position;