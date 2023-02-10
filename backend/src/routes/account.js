const express = require('express');
const router = express.Router();

const {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
} = require('../controllers/account');

router.post('/account', createAccount);

router.get('/account', getAccounts);

router.get('/account/:id', getAccount);

router.post('/account/update', updateAccount)

module.exports = router;

