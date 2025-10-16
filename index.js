const express = require('express');

const app = express();
const PORT = 3000;

app.get('/hello', (req, res) => {
  res.json({ message: "Hello from Orbit" });
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
