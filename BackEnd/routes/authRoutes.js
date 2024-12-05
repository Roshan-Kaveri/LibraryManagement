const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const router = express.Router();

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
      
          const newUser = new User({
            name,
            email,
            passwordHash: hashedPassword,
          });
      
          await newUser.save();
      
          const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
          res.status(201).json({ message: 'Registration successful!' , token});
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error' });
        }
      });

module.exports = router;
