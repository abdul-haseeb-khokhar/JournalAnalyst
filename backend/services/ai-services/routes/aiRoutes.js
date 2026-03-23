const express = require('express');
const router = express.Router();

const authMiddleware = require('../utils/authMiddleware');
const {analyze} = require('../controllers/aiController');

router.get('/analyze',authMiddleware,analyze);

module.exports = router;