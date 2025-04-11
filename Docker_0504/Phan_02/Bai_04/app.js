const express = require('express');
const app = express();
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello, Dockerized Node.js app with Express!');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
