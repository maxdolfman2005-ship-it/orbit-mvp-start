// index.js
const express = require('express');
const { PORT, OPENAI_API_KEY } = require('./config');

const app = express();

// use the one from config.js
// (no need to redeclare PORT here — you already imported it)


// already have:
/*
app.get('/hello', (req, res) => {
  res.json({ message: "Hello from Orbit" });
});
*/

// 1) /greet uses QUERY parameters (stuff after ? in the URL)
app.get('/greet', (req, res) => {
  // req.query is an object with everything after the "?"
  // e.g., /greet?name=Max  ->  req.query = { name: "Max" }
  const name = (req.query.name || '').trim();

  if (!name) {
    // Error handling if name is missing
    return res.status(400).json({
      error: "Missing 'name' query parameter",
      hint: "Try /greet?name=Max"
    });
  }

  res.json({ message: `Hello ${name}` });
});

// 2) Practice PATH params (parts of the path itself)
app.get('/users/:id', (req, res) => {
  // req.params grabs the :id from the path, e.g., /users/123 -> { id: "123" }
  const { id } = req.params;
  res.json({ userId: id, info: `You asked for user ${id}` });
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
