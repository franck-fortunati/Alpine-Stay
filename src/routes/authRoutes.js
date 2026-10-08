import express from 'express';
import { isGuest, isAuth } from '../middlewares/authMiddleware.js';

import {
    getRegisterForm,
    getLoginForm,
    logout,
    register,
    login
} from '../controllers/authController.js'

const router = express.Router();

router.get('/register', isGuest, getRegisterForm);
router.get('/login', isGuest, getLoginForm);
router.get('/logout', isAuth, logout);
router.post('/register', isGuest, register);
router.post('/login', isGuest, login);

export default router;