const Account = require('../models/account');

module.exports.createAccount = async (req, res, next) => {
    const args = {
      person: req.person.person,
      name: req.body.name,
      bank_name: req.body.bank_name,
      account_id: req.body.account_id,
      account_balance: req.body.account_balance,
      currency_id: req.body.currency_id,
    };
    try {
      await Account.create(args);
      res.status(200).json({ messsage: 'Category created successfully!' });
    } catch (error) {
      res.status(400).json({ messsage: error });
    }
  };


  module.exports.getAccount = async (req, res, next) => {
    const args = { person: req.person.person, account: Number(req.params.id) };
    try {
      const { rows } = await Account.findById(args);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(400).json({ messsage: error });
    }
  };

  module.exports.getAccounts = async (req, res, next) => {
    const args = { person: req.person.person };
    try {
      const { rows } = await Account.fetchAll(args);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(400).json({ messsage: error });
    }
  };

  
  module.exports.updateAccount = async (req, res, next) => {
    const args = { account_id: req.account.account_id, 
                    account_balance: req.account.account_balance,
                  };
    try {
      await Account.updateBalance(args);
      res.status(200).json({ message: 'Account balance updated.'});
    } catch (error) {
      res.status(400).json({ message: error }); 
    }
  }