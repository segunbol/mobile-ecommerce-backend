import express from 'express';
import { verifyToken } from '../helpers/utils';
import { deleteAccountBalance, getAccountBalance, performTransaction, updateAccountBalance } from '../controller/accountController';
const accountRoutes = express.Router();

// Get account balance
accountRoutes.get('/account/balance', verifyToken, getAccountBalance);

// Perform transaction
accountRoutes.post('/transaction', verifyToken, performTransaction);

accountRoutes.put('/account/balance', verifyToken, updateAccountBalance);

// Delete account balance
accountRoutes.delete('/account/balance', verifyToken, deleteAccountBalance);

export default accountRoutes