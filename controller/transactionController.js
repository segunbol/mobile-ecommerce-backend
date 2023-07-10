import AccountBalance from "../models/accountBalance.js";
import Transaction from "../models/transaction.js";

// Get all transactions for a user
// User will only see transactions with their UserId
// SuperAdmin will have access to all transaction
// StoreAdmin will only have access to transaction with its storeId
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

    const transaction = await Transaction.findOne({
      userId,
      _id: transactionId,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new transaction
// Only SuperAdmin will have access to this end point
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


export const sendMoney = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const amount = req.body.amount;
    const type = req.body.type;
    console.log(`${req.body.senderId} and ${req.body.receiverId}`);
    const senderWallet = await AccountBalance.findOne({
      userId: req.body.senderId,
    });
    const receiverWallet = await AccountBalance.findOne({
      userId: req.body.receiverId,
    });
    if (!receiverWallet) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({ message: "Sender not found" });
    }

    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    if (type === "debit") {
      const newSenderBalance = senderWallet.balance - amount;
      const newReceiverBalance = receiverWallet.balance + amount;

      const senderBalance = await AccountBalance.findByIdAndUpdate(
        senderWallet._id,
        { balance: newSenderBalance },
        { new: true }
      );

      const receiverBalance = await AccountBalance.findByIdAndUpdate(
        receiverWallet._id,
        { balance: newReceiverBalance },
        { new: true }
      );

      const oppositeType = "credit";
      const receiverTransaction = new Transaction({
        receiverUserId: receiverWallet.userId,
        senderUserId: senderWallet.userId,
        type: oppositeType,
        amount,
      });

      await receiverTransaction.save();

      const senderTransaction = new Transaction({
        receiverUserId: receiverWallet.userId,
        senderUserId: senderWallet.userId,
        type,
        amount,
      });

      await senderTransaction.save();

      return res.status(200).json({
        receiverBalance: receiverTransaction.toObject(),
        senderBalance: senderTransaction.toObject()
      });
    }
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
      return res.status(404).json({ message: "Transaction not found" });
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

    const transaction = await Transaction.findOne({
      userId,
      _id: transactionId,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.remove();

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
