import express from 'express';
import { verifyToken } from '../helpers/utils.js';
import {createStore, getStore, getStores, storeLogin} from '../controller/storeController.js';
import { createStoreWallet } from '../controller/storeWalletController.js';
const storeRoutes = express.Router();

//Get All Accounts
storeRoutes.get('/', getStores);

// Get account balance
storeRoutes.get('/:id', getStore);

// Create Account for Existing Users
storeRoutes.post('/', createStore)

// Create Account for All Users without an Account

.post('/login',storeLogin)



export default storeRoutes