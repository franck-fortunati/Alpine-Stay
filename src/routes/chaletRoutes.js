import express from 'express';
import { isAuth } from '../middlewares/authMiddleware.js';

import {
    getAllChalet,
    getChaletForm,
    getEditChaletForm,
    getMyChalet,
    getChaletById,
    createChalet,
    updateChalet,
    deleteChalet
} from '../controllers/chaletController.js';

const router = express.Router();

router.get('/', getAllChalet);
router.get('/new', isAuth, getChaletForm);
router.get('/edit/:id', isAuth, getEditChaletForm)
router.get('/my-locations', isAuth, getMyChalet)
router.get('/:id', getChaletById);
router.post('/', isAuth, createChalet);
router.patch('/:id', isAuth, updateChalet)
router.delete('/:id', isAuth, deleteChalet)

export default router