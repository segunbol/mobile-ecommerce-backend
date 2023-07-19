import express from 'express';
import { verifyToken } from '../helpers/utils.js';
import { createStoreWallet, getAllStoreWallets, getStoreWallet } from '../controller/storeWalletController.js';

const storeWalletRoutes = express.Router();

// Create Account for Store
storeWalletRoutes.get('/',createStoreWallet)

// Create Account for Store
storeWalletRoutes.get('/:id',createStoreWallet)

// Create Account for Store
storeWalletRoutes.post('/',createStoreWallet)

export default storeWalletRoutes