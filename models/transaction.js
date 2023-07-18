import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  receiverUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  senderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    maxDecimalPrecision: 128,
    format: {thousandsSeparator: ","},
    displayAsString: true,
    required: true,
  },
  balance: {
    type: Number,
    maxDecimalPrecision: 128,
    format: {thousandsSeparator: ","},
    displayAsString: true,
    required: true
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
