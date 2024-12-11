const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const googleLogin = require('./routes/googleLogin');
const authLogin = require('./routes/authLogin');
const getBooks = require('./routes/getBook');
const getBooksbyID = require('./routes/getBookfromId');
const handleBookRequest =  require('./routes/handleBookRequests');
const handleAdmin =  require('./routes/handleAdmin');
const startCronJob = require('./cron-jobs/updatefine'); 



const Book = require('./models/book'); 


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

connectDB();


// Initialize the cron job
startCronJob();


app.use('/api/auth', authRoutes);
app.use('/api/auth', googleLogin);
app.use('/api/auth', authLogin);
app.use('/api/books', getBooks);
app.use('/api/books', getBooksbyID);
app.use('/api', handleBookRequest);
app.use('/api', handleAdmin);



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

