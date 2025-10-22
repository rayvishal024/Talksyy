import otpGenerator from 'otp-generator'
import OtpModel from '../models/otp.model.js'
import UserModel from '../models/user.model.js'

const sendOTP = async (req, res) => {
    try {
      const { email } = req.body;
 
      // user user existence --
      const isUserExist = await UserModel.findOne({ email });
 
      if (isUserExist) {
           return res.status(401).json({
                success: false,
                message: "User Email Already Exist",
                data : null
           })
          
      }
 
      // now generating OTP 6 digit number
      let otp = otpGenerator.generate(6, {
           upperCaseAlphabets: false,
           lowerCaseAlphabets: false,
           specialChars: false,
      });
 
      // now check this otp into document , and generate upto not found
      let result = await OtpModel.findOne({ otp: otp });
 
      while (result) {
           otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
           });
           result = await OtpModel.findOne({ otp: otp });
      }
 
      // create document with email & otp
      const otpres = await OtpModel.create({ email, otp });
     
      // sending response to frontend
      res.status(200).json({
           success: true,
           message: "OTP Send Successfully to email",
           otp: otp
      });
 
    } catch (error) {
         console.log("SendOTP Error ::", error.message);
         res.status(500).json({ success: false, error: error.message });
    }
}

export default sendOTP;