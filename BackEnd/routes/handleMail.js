const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const transporter = require('../config/transporter');

const router = express.Router();

router.post("/send-password", async (req, res) => {
  const { email } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; 

    
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    
   


    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    const mailOptions = {
        from: "roshan.k.kaveri@gmail.com",
        to: email,
        subject: "Reset Your Password",
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
                  color: white !important; 
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
                <h2>Password Reset Request</h2>
                <p>Hello,</p>
                <p>You requested to reset your password. Please click the button below to reset it:</p>
                <a href="${resetLink}" class="button">Reset Password</a>
                <p>If you didn't request this, please ignore this email. Your password will not be changed.</p>
              </div>
              <div class="footer">
                <p>This email was sent to you by our system. If you have any questions, feel free to contact us.</p>
              </div>
            </body>
          </html>
        `,
      };
      
      

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).send({ error: "Failed to send password reset email" });
  }
});

router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }, 
      });
      console.log(token)
      if (!user) {
        return res.status(400).send({ error: "Invalid or expired token" });
      }
  
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.passwordHash = hashedPassword;
      user.resetToken = undefined; 
      user.resetTokenExpiry = undefined;
      await user.save();
  
      res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).send({ error: "Failed to reset password" });
    }
  });
  

module.exports = router;
