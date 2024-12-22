const express = require('express');
const router = express.Router();
const Book = require('../models/book'); 
const RentRequest = require('../models/requests'); 
const User = require('../models/user');

router.patch('/rent-requests/approve', async (req, res) => {
  const { requestId } = req.body;  
  try {
    const reservedUntil = new Date();
    reservedUntil.setMinutes(reservedUntil.getMinutes() + 2);

    
    const updatedRequest = await RentRequest.findByIdAndUpdate(
      requestId,
      { 
        status: 'Waiting to be Collected', 
        reservedUntil: reservedUntil 
      },
      { new: true }
    );
    
    if (!updatedRequest) {
      return res.status(404).send('Request not found');
    }

    
    const user = await User.findById(updatedRequest.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    
    const response = updatedRequest.toObject(); 
    response.userName = user.name;
    res.json(response);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.patch('/rent-requests/collect', async (req, res) => {
  const { requestId } = req.body; 
  try {
    const updatedRequest = await RentRequest.findByIdAndUpdate(
      requestId,
      { status: 'Collected' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).send('Request not found');
    }

    
    const user = await User.findById(updatedRequest.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    
    const response = updatedRequest.toObject(); 
    response.userName = user.name;
    res.json(response);

    
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.patch('/rent-requests/return', async (req, res) => {
  const { requestId } = req.body;
  try {
  
    const updatedRequest = await RentRequest.findByIdAndUpdate(
      requestId,
      { status: 'Returned' },
      { new: true } 
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Rent request not found' });
    }
    await RentRequest.findByIdAndDelete(requestId);


    res.status(200).json(updatedRequest); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to mark as returned' });
  }
});


router.get('/rent-requests', async (req, res) => {
  try {
    
    const requests = await RentRequest.find();

    
    const enrichedRequests = await Promise.all(
      requests.map(async (request) => {
        const user = await User.findById(request.userId);
        return {
          ...request.toObject(),
          userName: user ? user.name : 'Unknown User',
        };
      })
    );

    res.status(200).json(enrichedRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch rent requests' });
  }
});


module.exports = router;
