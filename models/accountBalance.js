import mongoose from "mongoose";

const accountBalanceSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      
    },
    balance: {
      type: Number,
      default: 0,
    },
  });
  
  const AccountBalance = mongoose.model('AccountBalance', accountBalanceSchema);
  export default AccountBalance