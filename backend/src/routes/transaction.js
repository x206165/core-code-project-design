const express = require('express');
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  getTransaction,
  reduceAccountBalance,
} = require('../controllers/transaction');

router.post('/transaction', createTransaction);

router.get('/transaction', getTransactions);

router.get('/transaction/:id', getTransaction);

router.post('/transaction/reduceBalance', reduceAccountBalance); 

module.exports = router;
