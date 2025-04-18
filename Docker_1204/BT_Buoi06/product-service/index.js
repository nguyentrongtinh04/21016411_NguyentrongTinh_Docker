const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Product Service is running on http://localhost:${PORT}`);
});
