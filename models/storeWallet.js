import mongoose from "mongoose";

const storeWalletSchema = new mongoose.Schema({
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
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
  
  const StoreWallet = mongoose.model('StoreWallet', storeWalletSchema);
  export default StoreWallet