const express = require('express');
const router = express.Router();

const { createTrade , getCustomizedTrades, getAllTrades } = require('../controllers/tradeController');
const authMiddleware  = require('../utils/authMiddleware');

router.post('/create', authMiddleware, createTrade);
router.get('/records', authMiddleware, getAllTrades);
router.get('/cutomized-records', authMiddleware, getCustomizedTrades);

module.exports = router;