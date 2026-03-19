const express = require('express');
const router = express.Router();

const { createTrade , getTrades } = require('../controllers/tradeController');
const authMiddleware  = require('../utils/authMiddleware');

router.post('/create', authMiddleware, createTrade);
router.get('/records', authMiddleware, getTrades);

module.exports = router;