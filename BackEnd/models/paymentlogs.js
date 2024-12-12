const mongoose = require("mongoose");

const paymentLogSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
const PaymentLog = mongoose.model('PaymentLog', paymentLogSchema);
module.exports = PaymentLog;
