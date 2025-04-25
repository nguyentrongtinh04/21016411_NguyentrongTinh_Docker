const express = require('express');
const axios = require('axios');
const CircuitBreaker = require('opossum');

const app = express();

// Hàm gọi Service B
const callServiceB = async () => {
  return await axios.get('http://localhost:5000/data');
};

// Cấu hình Circuit Breaker
const breaker = new CircuitBreaker(callServiceB, {
  errorThresholdPercentage: 20,   
  volumeThreshold: 5,              
  resetTimeout: 4000,            
  rollingCountTimeout: 10000,
  rollingCountBuckets: 1
});

// Các trạng thái của Circuit Breaker
breaker.on('open', () => console.log('🚫 Circuit Breaker đã mở: Tạm thời ngừng gửi yêu cầu đến Service B.'));
breaker.on('halfOpen', () => console.log('🕒 Circuit Breaker đang kiểm tra lại Service B (trạng thái Half-Open).'));
breaker.on('close', () => console.log('✅ Circuit Breaker đã đóng: Service B hoạt động ổn định trở lại.'));

app.get('/cb', async (req, res) => {
  console.log('\n🔔 Nhận request tại endpoint /cb');
  console.log(`📊 Trạng thái Circuit Breaker: ${breaker.opened ? 'MỞ (OPEN)' : 'ĐÓNG hoặc ĐANG KIỂM TRA (CLOSED or HALF-OPEN)'}`);

  try {
    const result = await breaker.fire();
    res.send(result.data);
  } catch (err) {
    if (breaker.opened) {
      return res.status(503).send('⚠️ Dịch vụ tạm dừng do Circuit Breaker đang mở. Vui lòng thử lại sau.');
    }
    res.status(503).send('❌ Không thể kết nối tới Service B. Vui lòng thử lại sau.');
  }
});

// Khởi chạy Service A
app.listen(3000, () => {
  console.log('🚀 Service A đang chạy tại http://localhost:3000');
});
