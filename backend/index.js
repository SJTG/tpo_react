const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const listsRoutes = require('./routes/lists');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/lists', listsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));