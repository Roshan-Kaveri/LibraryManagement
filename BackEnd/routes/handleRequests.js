// const express = require('express');
// const router = express.Router();
// const Book = require('../models/book'); 
// const RentRequest = require('../models/requests'); 

// router.post('/books', async (req, res) => {
//   try {
//     const { bookId } = req.body; 

//     if (!bookId) {
//       return res.status(400).json({ error: 'Book ID is required' });
//     }

//     const book = await Book.findById(bookId); 
//     if (!book) {
//       return res.status(404).json({ error: 'Book not found' });
//     }
//     res.json(book);  
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch book details' });
//   }
// });


// router.post('/requests/rent', async (req, res) => {
//   try {
//     console.log( req.body)
//     const { userId, bookId, bookTitle } = req.body; 
//     if (!userId || !bookId) {
//       return res.status(400).json({ error: 'User ID and Book ID are required' });
//     }

//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ error: 'Book not found' });
//     }
    
//     const newRequest = new RentRequest({
//       userId,
//       bookId,
//       bookTitle: bookTitle || book.title,
//       status: 'Requested',
//     });

//     await newRequest.save();
//     res.status(201).json({ message: 'Rent request submitted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to submit rent request' });
//   }
// });

// router.patch('/api/rent-requests/return', async (req, res) => {
//   const { requestId } = req.body;
//   try {
//     const updatedRequest = await RentRequest.findByIdAndUpdate(
//       requestId,
//       { status: 'Returned' },
//       { new: true } 
//     );

//     if (!updatedRequest) {
//       return res.status(404).json({ message: 'Rent request not found' });
//     }

//     await RentRequest.findByIdAndDelete(requestId);

//     res.status(200).json({ message: 'Request returned and deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to mark as returned or delete' });
//   }
// });



// // admin
// router.patch('/rent-requests/approve', async (req, res) => {
//   const { requestId } = req.body;  
//   try {
//     const updatedRequest = await RentRequest.findByIdAndUpdate(
//       requestId,
//       { status: 'Waiting to be Collected' },
//       { new: true }
//     );
//     if (!updatedRequest) {
//       return res.status(404).send('Request not found');
//     }
//     res.json(updatedRequest);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// router.patch('/rent-requests/collect', async (req, res) => {
//   const { requestId } = req.body; 
//   try {
//     // Step 1: Mark the request as 'Collected'
//     const updatedRequest = await RentRequest.findByIdAndUpdate(
//       requestId,
//       { status: 'Collected' },
//       { new: true }
//     );

//     if (!updatedRequest) {
//       return res.status(404).send('Request not found');
//     }

//     res.json({ message: 'Request collected and reset successfully' });
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// router.patch('/rent-requests/return', async (req, res) => {
//   const { requestId } = req.body;
//   try {
  
//     const updatedRequest = await RentRequest.findByIdAndUpdate(
//       requestId,
//       { status: 'Returned' },
//       { new: true } 
//     );

//     if (!updatedRequest) {
//       return res.status(404).json({ message: 'Rent request not found' });
//     }
//     await RentRequest.findByIdAndDelete(requestId);

//     res.status(200).json(updatedRequest); 
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to mark as returned' });
//   }
// });


// router.get('/rent-requests', async (req, res) => {
//   try {
//     const requests = await RentRequest.find(); 
//     res.status(200).json(requests);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch rent requests' });
//   }
// });
// // router.patch('/rent-requests/return', async (req, res) => {
// //   const { requestId } = req.body;
// //   try {
// //     const updatedRequest = await RentRequest.findByIdAndUpdate(
// //       requestId,
// //       { status: 'Returned' },
// //       { new: true } 
// //     );

// //     if (!updatedRequest) {
// //       return res.status(404).json({ message: 'Rent request not found' });
// //     }

// //     await RentRequest.findByIdAndDelete(requestId);

// //     res.status(200).json({ message: 'Request returned and deleted successfully' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Failed to mark as returned or delete' });
// //   }
// // });


// module.exports = router;
