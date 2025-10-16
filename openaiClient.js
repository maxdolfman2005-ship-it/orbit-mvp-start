// openaiClient.js
const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('./config');

// Make the OpenAI client using your secret key
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// Export it so other files can use it
module.exports = client;
