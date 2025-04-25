const express = require('express');
const axios = require('axios');

const app = express();

// ⏱️ Hàm thêm timeout cho promise
const withTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`⏰ Quá thời gian chờ (${ms / 1000}s). Hủy yêu cầu.`)), ms)
  );
  return Promise.race([promise, timeout]);
};

// Endpoint giới hạn thời gian gọi đến Service B
app.get('/time', async (req, res) => {
  console.log('\n🚀 Nhận request tại /time - gọi Service B với giới hạn thời gian 3s');

  try {
    const response = await withTimeout(
      axios.get('http://localhost:5000/data'),
      3000
    );
    console.log('✅ Nhận dữ liệu thành công từ Service B trong thời gian cho phép');
    res.send(response.data);
  } catch (err) {
    console.error(`❌ Lỗi: ${err.message}`);
    res.status(504).send(err.message); // Gateway Timeout
  }
});

app.listen(3000, () => {
  console.log('🚦 Service A (có giới hạn thời gian) đang chạy tại http://localhost:3000');
});
