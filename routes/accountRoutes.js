import express from 'express';
import { verifyToken } from '../helpers/utils.js';
import { createAccount, createAccountForAllUsers, deleteAccountBalance, deleteAllAccountBalance, getAccountBalance, getAllAccounts, updateAccountBalance } from '../controller/accountController.js';
const accountRoutes = express.Router();

//Get All Accounts
accountRoutes.get('/', getAllAccounts);

// Get account balance
accountRoutes.get('/balance/:id', getAccountBalance);

// Create Account for Existing Users
accountRoutes.post('/createexisting', createAccount)

// Create Account for All Users without an Account

accountRoutes.post('/createallusers',createAccountForAllUsers)



accountRoutes.put('/balance/:id', updateAccountBalance);

// Delete account balance
accountRoutes.delete('/:id', verifyToken, deleteAccountBalance);

// Delete All Accounts

accountRoutes.delete('/', deleteAllAccountBalance);

export default accountRoutes