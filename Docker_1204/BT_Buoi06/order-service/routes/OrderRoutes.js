const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Lấy tất cả đơn hàng
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Tạo đơn hàng mới
router.post('/', async (req, res) => {
  try {
    const { customerId, products, totalAmount } = req.body;
    const newOrder = new Order({ customerId, products, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Error creating order" });
  }
});

// Cập nhật trạng thái đơn hàng
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating order" });
  }
});

// Xóa đơn hàng
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order" });
  }
});

module.exports = router;
