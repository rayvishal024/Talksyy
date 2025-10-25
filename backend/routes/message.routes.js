import express from 'express';
import isloggin from '../middleware/auth.middleware.js';
import { getAllUsersandunseenCount, allMessageofUser, markMessageasSeen } from '../controllers/message.controller.js';


const router = express.Router();

// protedted routes
router.get('/getalluser', isloggin, getAllUsersandunseenCount);
router.get('/:id', isloggin, allMessageofUser);
router.put('/:messageId', isloggin, markMessageasSeen);

export default router;