import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
          trim : true
     },
     email: {
          type: String,
          required: true,
          trim: true,
          unique : true
     },
     profileImage: {
          type : String
     },
     bio: {
          type: String,
          maxLength : 100
     }, password: {
          type: String,
          require: true,
          minLength: true,
          select : false
     }
}, { timestamps: true });

userSchema.methods.generateAuthToken = async function () {
     return jwt.sign({id : this._id}, process.env.JWT_SECRET, {expiresIn : '1d'});
}

userSchema.methods.comparePassword = async function (candidatePassword) {
     return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.statics.hashPassword = async function (password) {
     const saltRounds = 10;
     return await bcrypt.hash(password, saltRounds);
}


const UserModel = mongoose.model('User', userSchema);

export default UserModel;