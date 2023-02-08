const express = require('express');
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  getTransaction,
} = require('../controllers/transaction');

router.post('/transaction', createTransaction);

router.get('/transaction', getTransactions);

router.get('/transaction/:id', getTransaction);

module.exports = router;
