// CommonJS version
require('dotenv').config();               // reads .env into process.env
const needed = ['OPENAI_API_KEY'];        // secrets we require
for (const k of needed) if (!process.env[k]) throw new Error(`Missing ${k} in .env`);
module.exports = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PORT: process.env.PORT || 3000,
};
