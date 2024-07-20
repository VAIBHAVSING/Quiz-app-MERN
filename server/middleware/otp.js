const {Otp} = require('../db/index');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,  // Use uppercase for environment variables
    pass: process.env.PASSWORD,
  },
});

async function sendOtp(email) {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpResponse = await Otp.findOneAndUpdate(
      { email: email }, // filter
      { otp: otp, createdAt: Date.now() }, // update data
      { upsert: true, new: true } // options
    );
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP for login',
      text: `Your OTP is ${otp}`,
    };

    const success=await transporter.sendMail(mailOptions);
    if(success){
        return true
    }
    else{
        return false
    }
      // Return OTP response if needed for further processing
  } catch (error) {
    console.log(error)
    return false;
    throw new Error('Failed to send OTP');
  }
}

module.exports = sendOtp;
