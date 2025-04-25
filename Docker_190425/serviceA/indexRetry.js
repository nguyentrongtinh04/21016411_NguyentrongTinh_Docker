const express = require('express');
const axios = require('axios');

const app = express();

// Hàm gọi Service B kèm cơ chế retry thủ công
const callWithRetry = async (maxRetries = 5, delay = 2000) => {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      console.log(`🔁 [Thử lần ${attempt + 1}] Gửi yêu cầu đến Service B...`);
      const res = await axios.get('http://localhost:5000/data');
      console.log(`✅ [Thành công] Nhận dữ liệu từ Service B tại lần thử ${attempt + 1}`);
      return res.data;
    } catch (err) {
      console.log(`❌ [Lỗi] Lần thử ${attempt + 1} thất bại: ${err.message}`);
      attempt++;
      if (attempt < maxRetries) {
        console.log(`⏳ Đợi ${delay / 1000} giây trước khi thử lại...\n`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw new Error('🚫 Không thể kết nối tới Service B sau nhiều lần thử. Vui lòng thử lại sau!');
      }
    }
  }
};

// Endpoint thử cơ chế retry
app.get('/retry', async (req, res) => {
  try {
    const result = await callWithRetry(5, 2000); // Tối đa 5 lần thử, cách nhau 2s
    res.send(result);
  } catch (err) {
    res.status(503).send(err.message);
  }
});

// Khởi chạy Service A
app.listen(3000, () => {
  console.log('🚀 Service A (có cơ chế Retry) đang chạy tại http://localhost:3000');
});
