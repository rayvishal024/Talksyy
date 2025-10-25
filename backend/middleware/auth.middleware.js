import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js';

const isloggin = async (req, res, next) => {
      
    try {
      const token = req.cookies.token;
 
      if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login Expired Please Loggin"
           });
      }
 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
      // finding user
      const user = await UserModel.findById(decoded._id).select('-password');
 
      // sending response for loggin
      if (!user) {
           return res.status(401).json({
                success: false,
                message: "Login Expired Please Loggin"
           });
      }
 
      // adding feild user for furthur use
      req.user = user;
      next();
    } catch (error) {
         console.log("auth middleware :: Error during token verification", error.message);
    }
     
}

export default isloggin;