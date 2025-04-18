const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String }
});

module.exports = mongoose.model('Customer', customerSchema);
