import Store from '../models/store.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getStores = async(req, res) => {
    try {
        const storeList = await Store.find();
        if(!storeList) {
        res.status(500).json({success: false})
    }
    res.send(storeList)
    } catch (error) {
        res.status(500).json({ error: error.message }) 
    }
    
  }

export const getStore = async (req, res) => {
try {
    const storeId = req.params.id; // Extracted from the authenticated user token
    console.log(storeId)
    const store = await Store.findOne({ storeId });

    if (!store) {
    return res.status(404).json({ message: 'Account balance not found' });
    }
    console.log(store.balance)
    res.json(store);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};


export const createStore = async (req, res) => {
    console.log(req.body.apartment)
    try {
        let user = new Store({
            walletBalance: req.body.walletBalance,
            storeName: req.body.storeName,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })
        user = await user.save(); 
    
        if(!user) 
        return res.status(400).send('the store cannot be created!')
    
        res.send(user);
    } catch (error) {
        res.status(500).json({ error: error.message }) 
    }
    
}

export const storeLogin = async (req,res) => {
    try {
        const user = await Store.findOne({email: req.body.email})
        const secret = process.env.SECRET;
        if(!user) {
            return res.status(400).send('The user not found');
        }
    
        if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                {   
                    walletBalance: user.walletBalance,
                    userId: user.id,
                    isAdmin: user.isAdmin,
                    storeName: user.storeName,
                    phone : user.phone,
                    email: user.email,
                    city: user.city,
                    country: user.country
                },
                secret,
                {expiresIn : '1d'}
            )
           
            res.status(200).send({user: user.email , token: token})
        } else {
           res.status(400).send('password is wrong!');
        } 
    } catch (error) {
        res.status(500).json({ error: error.message })
    }   
}

