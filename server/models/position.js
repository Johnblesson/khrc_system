import mongoose from "mongoose";

// Create a schema for storing the current row and column values
const positionSchema = new mongoose.Schema({
  currentRow: String,
  currentColumn: Number,
});

// Create a model based on the schema
const Position = mongoose.model('Position', positionSchema);

export default Position;