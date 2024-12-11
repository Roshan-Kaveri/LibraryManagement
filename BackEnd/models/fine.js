const mongoose = require("mongoose");

const FineSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  startTime: { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
});

const Fine = mongoose.model("Fine", FineSchema);

module.exports = Fine;
