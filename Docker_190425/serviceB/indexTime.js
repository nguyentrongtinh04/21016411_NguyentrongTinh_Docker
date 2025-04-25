const express = require('express');
const app = express();

// Endpoint có delay 5 giây mô phỏng service chậm
app.get('/data', (req, res) => {
  console.log('⏳ [Service B] Nhận request, đang xử lý trong 5 giây...');
  setTimeout(() => {
    console.log('✅ [Service B] Trả dữ liệu sau 5 giây delay');
    res.send('✅ Response from Service B (sau delay 5s)');
  }, 5000);
});

// Khởi chạy Service B
app.listen(4000, () => {
  console.log('🚀 [Service B] Đang chạy tại http://localhost:4000');
});
