import 'dotenv/config';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './database/db.connection';
import { itemsRouter } from './routers/items.router';

const PORT = process.env.PORT || 3001
const app = express();

// Connect to database
connectDB();

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

// Middlewares
app.use(bodyParser.json());

// Routers
app.use('/api/items', itemsRouter);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})