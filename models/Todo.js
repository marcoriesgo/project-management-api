const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Todo Schema
const TodoSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId, 
    ref: "project"
  },
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  description: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: Date.now
  }
});

module.exports = Todo = mongoose.model("todos", TodoSchema);