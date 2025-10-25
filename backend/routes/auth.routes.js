import express from "express";
import { register, login, updateprofile, logout } from "../controllers/auth.controller.js";
import isloggin from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// protected routes
router.put('/updateProfile', isloggin, updateprofile);
router.get('/logout', isloggin, logout);

export default router;