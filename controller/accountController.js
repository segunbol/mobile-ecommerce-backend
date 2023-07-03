import AccountBalance from '../models/accountBalance';
import Transaction from '../models/transaction';

// Get account balance
export const getAccountBalance = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token

    const accountBalance = await AccountBalance.findOne({ userId });

    if (!accountBalance) {
      return res.status(404).json({ message: 'Account balance not found' });
    }

    res.json(accountBalance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Perform transaction
export const performTransaction = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token
    const { amount, type } = req.body;

    // Create a new transaction
    const transaction = await Transaction.create({ userId, amount, type });

    // Update account balance based on transaction type
    let accountBalance = await AccountBalance.findOne({ userId });

    if (!accountBalance) {
      accountBalance = await AccountBalance.create({ userId, balance: 0 });
    }

    if (type === 'credit') {
      accountBalance.balance += amount;
    } else if (type === 'debit') {
      if (accountBalance.balance < amount) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
      accountBalance.balance -= amount;
    }

    await accountBalance.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update account balance
export const updateAccountBalance = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token
    const { balance } = req.body;

    let accountBalance = await AccountBalance.findOne({ userId });

    if (!accountBalance) {
      return res.status(404).json({ message: 'Account balance not found' });
    }

    accountBalance.balance = balance;
    await accountBalance.save();

    res.json(accountBalance);
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