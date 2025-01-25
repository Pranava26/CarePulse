import express from 'express';
import { createUser, getUser } from '../controllers/user.controller.js';
import { checkAuth, protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', createUser);

//Not using this route
router.get('/', getUser);

router.get('/check', protectRoute, checkAuth);

export default router;