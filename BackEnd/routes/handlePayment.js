const express = require('express');

const router = express.Router();

router.post('/order', async (req, res) => {
    const { amount, currency, userId } = req.body;
  
    try {
      const options = {
        amount: amount * 100, // Convert to paise
        currency: currency || 'INR',
        receipt: `receipt_${Date.now()}`,
      };
      const order = await razorpay.orders.create(options);
      res.json({ order });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  });
  
  // Endpoint to verify Razorpay payment
  router.post('/verify', async (req, res) => {
    const { orderId, paymentId, signature, amount, userId } = req.body;
  
    const generatedSignature = crypto
      .createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET') // Replace with your Razorpay Key Secret
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
  
    if (generatedSignature === signature) {
      try {
        const paymentLog = new PaymentLog({
          orderId,
          paymentId,
          amount,
          currency: 'INR',
          userId,
          status: 'Success',
        });
  
        await paymentLog.save();
        res.json({ success: true, message: 'Payment verified and logged successfully!' });
      } catch (error) {
        console.error('Error saving payment log:', error);
        res.status(500).json({ error: 'Failed to log payment' });
      }
    } else {
      res.status(400).json({ error: 'Payment verification failed' });
    }
  });

  module.exports = router;