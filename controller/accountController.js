import AccountBalance from '../models/accountBalance.js';
import Transaction from '../models/transaction.js';
import User from '../models/user.js';

// Get All Accounts
export const getAllAccounts = async(req, res) => {
  const accountList = await AccountBalance.find();
   

  
  if(!accountList) {
    res.status(500).json({success: false})
  }
  res.send(accountList)
}

// Get account balance
export const getAccountBalance = async (req, res) => {
  try {
    const userId = req.params.id; // Extracted from the authenticated user token
    console.log(userId)
    const accountBalance = await AccountBalance.findOne({ userId });

    if (!accountBalance) {
      return res.status(404).json({ message: 'Account balance not found' });
    }
    console.log(typeof accountBalance.balance)
    res.json(accountBalance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Automatical create account for existing users
//Create Account for Users One By One
export const createAccount = async (req, res) => {
  try {
    const userExist = await User.findById(req.body.userId)
    const accountExist = await AccountBalance.findOne({ userId: req.body.userId });
  if (!userExist) 
    return res.status(400).send("I no see User o, Boya you should create profile")
  if (accountExist)
    return res.status(400).send("This User get Account Already na")

  let wallet = new AccountBalance({
    userId: req.body.userId,
  })
  wallet = await wallet.save()
  if (!wallet)
  return res.status(400).send('The Account Was not created')

  res.send(wallet)
  } catch (error) {
    console.error('Error while creating accounts:', error)
  }
  
}



// Create for All Users
// Only Admin can do this or Authorise this
export const createAccountForAllUsers = async (req, res) => {
  const createdWallets = [];
  const existingWallets = [];
  const user = await User.findById(req.body.userId);
  
  if (user.isAdmin !== true) {
    return res.status(400).send('You dont have permission to do this');
  }

  try {
    const allUsers = await User.find({});

    for (const user of allUsers) {
      const accountExist = await AccountBalance.findOne({ userId: user._id });

      if (!accountExist) {
        const wallet = new AccountBalance({
          userId: user._id,
        });
        await wallet.save();
        createdWallets.push(user.name);
      } else {
        existingWallets.push(user.name);
      }
    }

    if (createdWallets.length > 0) {
      return res.status(200).send(`Accounts created for Users: ${createdWallets.join(', ')}`);
    } else {
      return res.status(200).send(`Users: ${existingWallets.join(', ')} already have accounts`);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Update account balance
export const updateAccountBalance = async (req, res) => {
  try {
    const userId = req.params.id; // Extracted from the authenticated user token
    // const { balance } = req.body;

    let accountBalance = await AccountBalance.findOne({ userId });

    if (!accountBalance) {
      return res.status(404).json({ message: 'Account balance not found' });
    }
    // const stringBalance = String(accountBalance.balance)
   
    accountBalance.balance = 5000000000000000;
    await accountBalance.save();
    let newAccountBalance = await AccountBalance.findOne({ userId });
    console.log(typeof newAccountBalance.balance)
    res.json(newAccountBalance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete account balance
export const deleteAccountBalance = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token
    
    const accountBalance = await AccountBalance.findOne({ userId });

    if (!accountBalance) {
      return res.status(404).json({ message: 'Account balance not found' });
    }

    await accountBalance.remove();

    res.json({ message: 'Account balance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete All Wallets

export const deleteAllAccountBalance = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
  
    if (user.isAdmin !== true) {
      return res.status(400).send('You dont have permission to do this');
    }
    await AccountBalance.deleteMany({});

    res.json({ message: 'All account balances deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};