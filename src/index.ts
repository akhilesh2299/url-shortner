import express from 'express';
import urlRoutes from './routes/urlRoutes';
import dotenv from 'dotenv';
import path  from 'path';
import { Request, Response } from 'express';
dotenv.config();


import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get('/api', (_req, res) => {
  res.send('Server is up and running');
});

app.use('/', urlRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string)
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

startServer();

