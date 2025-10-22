import sendOTP from "../controllers/otp.controller.js";
import express from 'express'

const router = express.Router();

router.post('/send-otp', sendOTP);

export default router;