const mongoose = require("mongoose");

const RentRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  bookTitle: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Requested", "Approved", "Waiting to be Collected", "Late", "Collected", "Returned"], 
    default: "Requested" 
  },
  reservedUntil: { type: Date }, 
  createdAt: { type: Date, default: Date.now },
});


const RentRequest = mongoose.model("RentRequest", RentRequestSchema);

module.exports = RentRequest;
