import mongoose from "mongoose";

// Create a schema for storing the current row and column values
const positionSchema = new mongoose.Schema({
  currentRow: String,
  currentColumn: Number,
});

// Create a model based on the schema
const ls11Position = mongoose.model('ls1-Position', positionSchema);

export default ls11Position;