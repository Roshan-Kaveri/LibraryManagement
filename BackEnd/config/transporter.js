
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "roshan.k.kaveri@gmail.com",
    pass: "kdkw xolt vood inss", 
  },
});


module.exports = transporter;
