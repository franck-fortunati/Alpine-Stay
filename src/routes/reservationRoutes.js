import express from 'express';
import { isAuth } from '../middlewares/authMiddleware.js';

import {
    getReservationByUserId,
    getChaletById,
    createReservation,
    cancelReservation,
    updateReservationStatusByHost
} from '../controllers/reservationController.js'

const router = express.Router();

router.get('/my-reservation', isAuth, getReservationByUserId);
router.get('/new/:chaletId', isAuth, getChaletById);
router.post('/', isAuth, createReservation);
router.patch('/:id/cancel', isAuth, cancelReservation)
router.patch('/:id/status', isAuth, updateReservationStatusByHost)

export default router;