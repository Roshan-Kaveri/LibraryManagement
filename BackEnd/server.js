const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const googleLogin = require('./routes/googleLogin');
const authLogin = require('./routes/authLogin');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/auth', googleLogin);
app.use('/api/auth', authLogin);



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
