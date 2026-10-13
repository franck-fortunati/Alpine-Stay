import express from 'express';
import { isAdmin } from '../middlewares/authMiddleware.js';

import {
    getDashboard,
    getAllUser,
    getAllChalet,
    getAllReservation,
    updateChaletStatus,
    deleteUser
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', isAdmin, getDashboard);
router.get('/user', isAdmin, getAllUser);
router.get('/chalet', isAdmin, getAllChalet);
router.get('/reservation', isAdmin, getAllReservation)
router.post('/chalet/:id/status', isAdmin, updateChaletStatus);
router.post('/user/:id', isAdmin, deleteUser)

export default router;