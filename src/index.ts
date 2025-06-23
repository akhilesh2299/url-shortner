import express from 'express';
import urlRoutes from './routes/urlRoutes';

import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api', (_req, res) => {
  res.send('Server is up and running');
});

app.use('/api', urlRoutes);


const startServer = async () => {
  try {
    await mongoose.connect('mongodb+srv://akhil23:S1O5pVNPR2l7DQfR@cluster0.6ft1lt8.mongodb.net/urlshortner');
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

