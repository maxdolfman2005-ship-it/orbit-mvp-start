// index.js
const express = require('express');
const { PORT } = require('./config'); // reads .env
const client = require('./openaiClient'); // ✅ import the OpenAI client from new file

const app = express();

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

// 3) /plan route talks to OpenAI
app.get('/plan', async (req, res) => {
  const topic = (req.query.topic || 'studying').trim();
  const steps = Math.min(Math.max(parseInt(req.query.steps || '3', 10), 1), 6);

  try {
    const prompt = `Give me ${steps} short, numbered study tips for ${topic}. One sentence each.`;
    const out = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 220
    });

    const text = out.choices?.[0]?.message?.content?.trim() || "";
    res.json({ topic, steps, plan: text });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: "OpenAI request failed", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
