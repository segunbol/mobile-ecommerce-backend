import Store from '../models/store.js';
import StoreWallet from '../models/storeWallet.js';
import User from '../models/user.js';

// Get All Accounts
export const getAllStoreWallets = async(req, res) => {
    const wallettList = await StoreWallet.find();
  
    if(!wallettList) {
      res.status(500).json({success: false})
    }
    res.send(wallettList)
  }
  
  // Get account balance
export const getStoreWallet = async (req, res) => {
    try {
      const storeId = req.params.id; // Extracted from the authenticated user token
      
      const storeWallet = await StoreWallet.findOne({ storeId });
  
      if (!storeWallet) {
        return res.status(404).json({ message: 'Wallet balance not found' });
      }
      console.log(typeof accountBalance.balance)
      res.json(storeWallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


export const createStoreWallet = async (req, res) => {
    try {
      const storeExist = await Store.findById(req.body.storeId)
      const walletExist = await StoreWallet.findOne({ storeId: req.body.storeId });
    if (!storeExist) 
      return res.status(400).send("I no see User o, Boya you should create profile")
    if (walletExist)
      return res.status(400).send("This User get Account Already na")
  
    let wallet = new StoreWallet({
      storeId: req.body.storeId,
    })
    wallet = await wallet.save()
    if (!wallet)
    return res.status(400).send('The Account Was not created')
  
    res.send(wallet)
    } catch (error) {
      console.error('Error while creating accounts:', error)
    }
    
  }