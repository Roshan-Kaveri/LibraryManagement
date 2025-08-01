const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const googleLogin = require("./routes/googleLogin");
const authLogin = require("./routes/authLogin");
const getBooks = require("./routes/getBook");
const getBooksbyID = require("./routes/getBookfromId");
const handleBookRequest = require("./routes/handleBookRequests");
const handleAdmin = require("./routes/handleAdmin");
const handleMyBooks = require("./routes/handleMyBooks");
const handleFines = require("./routes/handleFines");
const getUserById = require("./routes/getUserFromId");
const handlePayment = require("./routes/handlePayment");

const createBooks = require("./routes/createBook");
const handleMail = require("./routes/handleMail");

const startCronJob = require("./cron-jobs/updatefine");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

connectDB();

startCronJob();

app.use("/api/auth", handleMail);

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleLogin);
app.use("/api/auth", authLogin);
app.use("/api/books", getBooks);
app.use("/api/books", getBooksbyID);

app.use("/api/books", createBooks);

app.use("/api", handleBookRequest);
app.use("/api", handleAdmin);
app.use("/api", handleMyBooks);
app.use("/api", handleFines);
app.use("/api/users", getUserById);
app.use("/api", handlePayment);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
