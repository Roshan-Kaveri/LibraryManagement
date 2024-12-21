const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const router = express.Router();
const transporter = require('../config/transporter');


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passwordHash: hashedPassword,
    });

    await user.save();

    // Create a token for account deletion link
    const deletionToken = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // Send email with deletion link

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Account Registration and Deletion Link',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f7fc;
                color: #333;
                padding: 20px;
              }
              .email-container {
                background-color: #ffffff;
                padding: 25px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
              }
              h2 {
                color: #4CAF50;
              }
              p {
                line-height: 1.5;
              }
              .button {
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                border: none;
                transition: background-color 0.3s ease;
              }
              .button:hover {
                background-color: #45a049;
              }
              .footer {
                font-size: 12px;
                color: #777;
                text-align: center;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <h2>Welcome to Our Service, ${name}!</h2>
              <p>Your account has been successfully registered. We're excited to have you on board!</p>
              <p>If you ever decide to delete your account, simply click the button below:</p>
              <a href="http://localhost:5000/api/auth/delete-account?token=${deletionToken}" class="button">Delete My Account</a>
              <p>If you did not request this action, please ignore this email. Your account is safe.</p>
              <p>Thank you for being a part of our community!</p>
            </div>
            <div class="footer">
              <p>This email was sent to you by our system. If you have any questions, feel free to contact us.</p>
            </div>
          </body>
        </html>
      `,
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ message: 'Registration successful!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/delete-account', async (req, res) => {
  const { token } = req.query; // The token is passed as a query parameter

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Verify the deletion token
    const decoded = jwt.verify(token, 'your-secret-key');
    const userId = decoded.userId;

    // Find and delete the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.deleteOne();
    res.status(200).json({ message: 'Your account has been deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
