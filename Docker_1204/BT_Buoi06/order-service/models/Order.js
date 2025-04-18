const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  products: [
    {
      productId: String,
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: 'pending' // hoặc 'confirmed', 'shipped', 'cancelled'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
