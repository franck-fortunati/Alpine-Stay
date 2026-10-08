import express from 'express';
import { isAdmin } from '../middlewares/authMiddleware.js';

import {
    getDashboard,
    getAllUser,
    getAllChalet,
    updateChaletStatus,
    deleteUser
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', isAdmin, getDashboard);
router.get('/user', isAdmin, getAllUser);
router.get('/chalet', isAdmin, getAllChalet);
router.patch('/chalet/:id/status', isAdmin, updateChaletStatus);
router.delete('/user/:id', isAdmin, deleteUser)

export default router;