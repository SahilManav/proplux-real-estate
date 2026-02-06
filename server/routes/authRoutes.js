import express from 'express';
import {
  registerUser,
  loginUser,
  googleLogin,
  updatePassword, // ✅ Added
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.post('/update-password', updatePassword); // ✅ New route

export default router;
