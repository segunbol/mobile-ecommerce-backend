import express from 'express'
import { createTransaction, deleteTransaction, getAllTransactions, getTransaction, updateTransaction } from '../controller/transactionController';
import { verifyToken } from '../helpers/utils';

const transactionRoutes = express.Router();

// Get all transactions for a user
transactionRoutes.get('/transactions', verifyToken, getAllTransactions);

// Get a specific transaction
transactionRoutes.get('/transactions/:id', verifyToken, getTransaction);

// Create a new transaction
transactionRoutes.post('/transactions', verifyToken, createTransaction);

// Update a transaction
transactionRoutes.put('/transactions/:id', verifyToken, updateTransaction);

// Delete a transaction
transactionRoutes.delete('/transactions/:id', verifyToken, deleteTransaction);

export default transactionRoutes