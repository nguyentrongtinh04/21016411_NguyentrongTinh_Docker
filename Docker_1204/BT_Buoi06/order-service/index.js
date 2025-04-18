require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/OrderRoutes');

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB - Order Service'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Route
app.use('/api/orders', orderRoutes);

// Khởi chạy server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Order Service is running at http://localhost:${PORT}`);
});
