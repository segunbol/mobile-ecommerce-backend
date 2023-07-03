import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRoutes from './routes/categories.js';
import productsRoutes from './routes/products.js';
import usersRoutes from './routes/users.js';
import ordersRoutes from './routes/orders.js';
import authJwt from './helpers/jwt.js';
import errorHandler from './helpers/error-handler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import accountRoutes from './routes/accountRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express()

app.use(cors());
app.options('*', cors())

//middleware
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(authJwt())
app.use(errorHandler);
app.use('/publicfiles/uploads', express.static(__dirname + './publicfiles/uploads')); 


//Routes
const api = process.env.API_URL;
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/account`, accountRoutes);
app.use(`${api}/transaction`, transactionRoutes);


app.listen(3000, ()=> { 
    console.log("Wa ti ma gbor") 
})