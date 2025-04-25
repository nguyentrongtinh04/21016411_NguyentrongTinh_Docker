const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

const app = express();

// Biến đếm số request theo IP
let requestCounts = {};

// Middleware rate limit
const limiter = rateLimit({
  windowMs: 60 * 1000,     // Mỗi 1 phút
  max: 10,                 // Tối đa 10 request
  standardHeaders: true,
  legacyHeaders: false,
  message: '⛔ Quá nhiều yêu cầu. Vui lòng chờ 1 phút.',
  handler: (req, res, next, options) => {
    const ip = req.ip;
    const count = requestCounts[ip] || 0;
    console.log(`🚫 Giới hạn bị vượt — IP: ${ip}, Số lần: ${count}/10`);
    res.status(429).send(`⛔ Quá nhiều yêu cầu (${count}/10). Vui lòng thử lại sau 1 phút.`);
  },
  keyGenerator: (req) => req.ip,
});

// Middleware đếm số request theo IP (dùng để log/debug)
app.use((req, res, next) => {
  const ip = req.ip;
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;
  console.log(`📈 IP ${ip} đã gửi ${requestCounts[ip]}/10 yêu cầu`);
  next();
});

// Endpoint bị giới hạn
app.get('/limited', limiter, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/data');
    res.send(`✅ Thành công! Yêu cầu thứ ${requestCounts[req.ip]}/10\n` + response.data);
  } catch (err) {
    res.status(503).send('❌ Không thể kết nối tới Service B.');
  }
});

// Reset lại bộ đếm mỗi phút
setInterval(() => {
  console.log('🔄 Reset bộ đếm yêu cầu cho tất cả IP');
  requestCounts = {};
}, 60 * 1000);

app.listen(3000, () => {
  console.log('🚀 Service A (có rate limit) đang chạy tại http://localhost:3000');
});
