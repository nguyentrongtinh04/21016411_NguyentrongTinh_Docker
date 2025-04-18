require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/CustomerRoutes');

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB - Customer Service'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Route
app.use('/api/customers', customerRoutes);

// Khởi chạy server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Customer Service is running at http://localhost:${PORT}`);
});
