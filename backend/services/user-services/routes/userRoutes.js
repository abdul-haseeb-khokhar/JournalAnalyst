const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');


router.post('/register',userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);

router.get('/auth/google',userController.googleAuth);
router.get('/auth/google/callback',userController.googleCallback);

module.exports = router;
