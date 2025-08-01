const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orders");
const Book = require("../models/book");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order or Return Free Book Link
router.post("/order/create", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const isFree = !book.price || book.price === 0;

    if (isFree) {
      return res.status(200).json({
        free: true,
        message: "This book is free to download.",
        downloadLink: book.downloadLink,
        bookId: book._id,
      });
    }

    const amount = book.price * 100; // convert to paisa

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_order_${Math.random() * 1000}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId,
      bookId,
      amount,
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    res.status(200).json({
      free: false,
      orderId: razorpayOrder.id,
      amount,
      currency: options.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error in /order/create:", error);
    res.status(500).json({ error: "Unable to create Razorpay order" });
  }
});

// Handle Razorpay Payment Success
router.post("/order/success", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) return res.status(404).json({ error: "Order not found" });

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.status = "paid";
    await order.save();

    const book = await Book.findById(order.bookId);

    res.status(200).json({
      message: "Payment successful",
      order,
      downloadLink: book?.downloadLink || null,
    });
  } catch (error) {
    console.error("Error in /success:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

// Check if user owns the book
router.get("/order/check/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    console.log("re at order/check/:userId/:bookId");
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Free books are always owned
    if (!book.price || book.price === 0) {
      return res.status(200).json({
        owns: true,
        free: true,
        downloadLink: book.downloadLink || null,
      });
    }

    const order = await Order.findOne({
      userId,
      bookId,
      status: "paid",
    });

    const owns = !!order;
    console.log(owns);
    res.status(200).json({
      owns,
      free: false,
      downloadLink: owns ? book.downloadLink : null,
    });
  } catch (error) {
    console.error("Error in /check:", error);
    res.status(500).json({ error: "Failed to check ownership" });
  }
});

module.exports = router;
