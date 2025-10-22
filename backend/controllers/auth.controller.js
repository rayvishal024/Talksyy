import UserModel from "../models/user.model.js";
import OtpModel from "../models/otp.model.js";

const register = async (req, res) => {
     try {
          const { name, email, otp, password } = req.body;

          // check input feild 
          if (!name || !email || !password || !otp) {

               return res.status(403).json({
                    success: false,
                    message: 'All fields are required',
               });
          }  

          // check user existence --
          const isUserExist = await UserModel.findOne({ email });

          if (isUserExist) {
               return res.status(400).json({
                    success: false,
                    message: "User already Exist"
               });
          }

          // matching otp with databse otp
          const response = await OtpModel.find({ email }).sort({ createdAt: -1 }).limit(1);

          if (response.length === 0 || response[0].otp !== otp) {
               return res.status(400).json({
                    success: false,
                    message : "Invalid OTP"
               })
          }

          // hashing password
          const hashPassword = await UserModel.hashPassword(password);

          // creating user
          const createduser = await UserModel.create({ name, email, password: hashPassword });
         
          const user = createduser.toObject();
          delete user.password;

          // sending response
        return res.status(201).json({
               success: true,
               message: "User Registered successfully ",
               User: user
          });

     } catch (error) {
          console.log("Register Errror :: Error During Registration ", error.message);
     }
}

const login = async (req, res) => {
     try {
          const { email, password } = req.body;
          
          if (!email || !password) {
               return res.status(403).json({
                    success: false,
                    message: 'All fields are required',
               });
          }

          const user = await UserModel.findOne({ email });

          if (!user) {
               return res.status(401).json({
                    success: false,
                    message: 'Invalid email & password',
               });
          }

          const iscorrectPassword = user.comparePassword(password);

          if (!iscorrectPassword) {
               return res.status(401).json({
                    success: false,
                    message: 'Invalid email & password',
               });
          }

          return res.status(200).json({
               success: true,
               message: 'User Loggin Successfully',
          });
     } catch (error) {
          console.log("login Error ::", error.message)
           res.status(500).json({
               success: false,
               error : error.message
          });
     }
}

export { register, login };