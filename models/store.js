import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {   
        walletBalance: {
            type: Number,
            maxDecimalPrecision: 128,
            displayAsString: true,
            format: {thousandsSeparator: ","},
            default: 0
        },
        storeName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        apartment: {
            type: String,
            default: ''
        },
        zip :{
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        }

    })

storeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

storeSchema.set('toJSON', {
    virtuals: true,
});

const Store = mongoose.model("Store", storeSchema);

export default Store; 
    