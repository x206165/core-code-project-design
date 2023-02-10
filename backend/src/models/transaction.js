const { pool } = require('../utils/oracle');

module.exports.create = ({ person, debitAccount, creditAccount, description, categoryID, accountNumber, amount, debitCurrency, creditCurrency }) => {
  // save transaction
  const bindings = {person, debitAccount, creditAccount, description, categoryID, accountNumber, amount, debitCurrency, creditCurrency };
  const SQL_INSERT_TRANSACTION = `INSERT INTO TRANSACTIONS(TXN_ID, DEBIT_ACCOUNT_ID, CREDIT_ACCOUNT_ID, PERSON,
                               DESCRIPTION, CATEGORY_ID, ACCOUNT_NUMBER, AMOUNT, DEBIT_CURRENCY, CREDIT_CURRENCY, ADD_DATE)
                              VALUES(SQ_TRANSACTIONS.NEXTVAL, :debitAccount, :creditAccount, :person,
                                :description, :categoryID, :accountNumber, :amount, :debitCurrency, :creditCurrency, SYSDATE)`;
  console.log(SQL_INSERT_TRANSACTION, bindings);
  return pool(SQL_INSERT_TRANSACTION, bindings, { autoCommit: true });
};

module.exports.findById = ({ person, transaction }) => {
  const bindings = { person, transaction };
  const SQL_SELECT_TRANSACTION = `SELECT                                 
                                DEBIT_ACCOUNT_ID AS "debitAccount",
                                CREDIT_ACCOUNT_ID AS "creditAccount",
                                ACCOUNT_NUMBER AS "accountNumber", 
                                DESCRIPTION AS "description", 
                                CATEGORY_ID AS "categoryID", 
                                AMOUNT AS "amount",
                                DEBIT_CURRENCY AS "debitCurrency",
                                CREDIT_CURRENCY AS "creditCurrency" 
                              FROM TRANSACTIONS WHERE TXN_ID = :transaction AND PERSON = :person`;
  console.log(SQL_SELECT_TRANSACTIONS, bindings);
  return pool(SQL_SELECT_TRANSACTION, bindings);
};

module.exports.fetchAll = ({ person }) => {
  const bindings = { person };
  const SQL_SELECT_TRANSACTIONS = `SELECT 
                                    TRANSACTIONS.DEBIT_ACCOUNT_ID AS "debitAccount",
                                    TRANSACTIONS.CREDIT_ACCOUNT_ID AS "creditAccount",
                                    TRANSACTIONS.ACCOUNT_NUMBER AS "accountNumber", 
                                    TRANSACTIONS.DESCRIPTION AS "description", 
                                    CATEGORY.NAME AS "categoryID", 
                                    TRANSACTIONS.AMOUNT AS "amount",
                                    TRANSACTIONS.DEBIT_CURRENCY AS "debitCurrency",
                                    TRANSACTIONS.CREDIT_CURRENCY AS "creditCurrency"  
                                  FROM TRANSACTIONS, CATEGORY WHERE TRANSACTIONS.PERSON = :person AND TRANSACTIONS.CATEGORY_ID = CATEGORY.CATEGORY`;  
                                

  console.log(SQL_SELECT_TRANSACTIONS, bindings);
  return pool(SQL_SELECT_TRANSACTIONS, bindings);
};

module.exports.reduceBalance = ({ debitAccount, amount }) => {
  const bindings = { debitAccount, amount };
  const SQL_UPDATE_ACCOUNT = `UPDATE APPUSER.ACCOUNT
                                SET ACCOUNT_BALANCE=( ACCOUNT_BALANCE - :amount ), MOD_DATE=SYSDATE 
                                WHERE ACCOUNT_ID = :debitAccount`;
  return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true }); 
}