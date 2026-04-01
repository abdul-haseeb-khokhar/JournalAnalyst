const express = require('express');
const router = express.Router();

const { createTrade , getCustomizedTrades, getAllTrades, editTrade, deleteTrade } = require('../controllers/tradeController');
const authMiddleware  = require('../utils/authMiddleware');

router.post('/create', authMiddleware, createTrade);
router.get('/records', authMiddleware, getAllTrades);
router.get('/customized-records', authMiddleware, getCustomizedTrades);
router.put('/edit/:tradeId', authMiddleware, editTrade);
router.delete('/delete/:tradeId', authMiddleware, deleteTrade);

module.exports = router;