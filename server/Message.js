// const mongoose = require('mongoose');
import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
  content: String,
  name: String,
}, {
  timestamps: true,
});

// module.exports = mongoose.model('Message', messageSchema);
export default mongoose.model('Message', messageSchema);