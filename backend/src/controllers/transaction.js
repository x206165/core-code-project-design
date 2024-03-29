const Transaction = require('../models/transaction');

module.exports.createTransaction = async (req, res, next) => {
  const args = {
    person: req.person.person,
    //name: req.body.name,
    //description: req.body.description,

    debitAccount: req.body.debitAccount,
    creditAccount: req.body.creditAccount,
    description: req.body.description, 
    categoryID: req.body.categoryID, 
    accountNumber: req.body.accountNumber,
    amount: req.body.amount,
    debitCurrency: req.body.debitCurrency,
    creditCurrency: req.body.creditCurrency,
  };

  const args2 = {    
    debitAccount: req.body.debitAccount,    
    amount: req.body.amount,
  };

  const args3 = {    
    creditAccount: req.body.creditAccount,     
    amount: req.body.amount,
  };


  try {
    await Transaction.create(args);
    // validate if debit account exist 
    if ( req.body.debitAccount != '') {
      await Transaction.reduceBalance(args2);
    }
    if ( req.body.creditAccount != '' ) {
      await Transaction.increaseBalance(args3); 
    }    
    
    res.status(200).json({ messsage: 'Transaction created successfully!' });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.getTransaction = async (req, res, next) => {
  const args = { person: req.person.person, transaction: Number(req.params.id) };
  try {
    const { rows } = await Transaction.findById(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};

module.exports.getTransactions = async (req, res, next) => {
  const args = { person: req.person.person };
  try {
    const { rows } = await Transaction.fetchAll(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};



module.exports.reduceAccountBalance = async (req, res, next) => {
  const args = {
    person: req.person.person,    
    debitAccount: req.body.debitAccount,
    creditAccount: req.body.creditAccount,
    description: req.body.description, 
    categoryID: req.body.categoryID, 
    accountNumber: req.body.accountNumber,
    amount: req.body.amount,
    debitCurrency: req.body.debitCurrency,
    creditCurrency: req.body.creditCurrency,
  };
  try {
    await Transaction.reduceBalance(args);
    res.status(200).json({ messsage: 'Debit balance updated successfully!' });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
};


