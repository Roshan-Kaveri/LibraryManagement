
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "roshan.k.kaveri@gmail.com",
    pass: "kdkw xolt vood inss", // Replace with app password
  },
});

// Export the transporter object so it can be imported in other files
module.exports = transporter;
