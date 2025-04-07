// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import testRoutes from './routes/test.routes';

dotenv.config();
// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


//uso di immagini statiche
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/test", testRoutes)

// DB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/filibibertoTekDB')
  .then(() => {
    console.log('✅ Connessione a MongoDB riuscita');
    app.listen(PORT, () => console.log(`🚀 Server avviato sulla porta ${PORT}`));
  })
  .catch(err => console.error('❌ Errore nella connessione a MongoDB:', err));
