import Transaction from '../models/transaction.js';


// Get all transactions for a user
export const getAllTransactions = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token

    const transactions = await Transaction.find({ userId });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific transaction
export const getTransaction = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token
    const transactionId = req.params.id;

    const transaction = await Transaction.findOne({ userId, _id: transactionId });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token
    const { amount, type } = req.body;

    const transaction = await Transaction.create({ userId, amount, type });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token
    const transactionId = req.params.id;
    const { amount, type } = req.body;

    let transaction = await Transaction.findOne({ userId, _id: transactionId });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.amount = amount;
    transaction.type = type;
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the authenticated user token
    const transactionId = req.params.id;

    const transaction = await Transaction.findOne({ userId, _id: transactionId });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.remove();

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};