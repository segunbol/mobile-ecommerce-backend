import mongoose from "mongoose";

const accountBalanceSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      
    },
    walletBalance: {
      type: Number,
      maxDecimalPrecision: 128,
      displayAsString: true,
      format: {thousandsSeparator: ","},
      required: true,

    },
  });
  
  const AccountBalance = mongoose.model('AccountBalance', accountBalanceSchema);
  export default AccountBalance