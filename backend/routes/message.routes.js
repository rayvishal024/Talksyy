import express from 'express';
import isloggin from '../middleware/auth.middleware.js';
import { getAllUsersandunseenCount, allMessageofUser, markMessageasSeen, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

// protedted routes
router.get('/getalluser', isloggin, getAllUsersandunseenCount);
router.get('/:id', isloggin, allMessageofUser);
router.put('/:messageId', isloggin, markMessageasSeen);
router.post('/sendmessage/:id', isloggin, sendMessage);

export default router;