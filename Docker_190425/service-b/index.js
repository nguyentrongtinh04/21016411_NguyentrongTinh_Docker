const express = require('express');
const app = express();

// Endpoint chính trả dữ liệu
app.get('/data', (req, res) => {
  console.log('📥 Nhận yêu cầu tại /data');
  res.send('✅ Hello from Service B');
});

// Khởi chạy Service B
app.listen(4000, () => {
  console.log('🚀 Service B đang chạy tại http://localhost:4000');
});
