import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
     email: {
          type: String,
          required: true
     },
     otp: {
          type: String,
          required: true
     },
     createdAt: {
          type: Date,
          default: Date.now,
          expires: 60 * 5
     }
});

// methode to send email --
const sendVerificationEmail = async (email, otp) => {
     try {
      const mailresponse =  await mailSender(email, "Verification Email",
               `<h1>Please confirm your Email</h1>
               <p>Here is your OTP ${otp}</p> `);
          console.log("Email send to user Successsfully ");
     } catch (error) {
          console.log("OTP Error : sending mail to User", error.message);
     }
}

// pre middleware before save
otpSchema.pre("save", async function (next) {
     
     // Only send an email when a new document is created
     if (this.isNew) {
          await sendVerificationEmail(this.email, this.otp);
     }
     next();
});

const OtpModel = mongoose.model('Otp', otpSchema);
export default OtpModel;