const mongoose = require('mongoose');
const { env } = require('./env');

async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn('MONGO_URI not set. Running HomeBites API in in-memory MVP mode.');
    return;
  }

  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected');
  } catch (_error) {
    console.warn('MongoDB connection failed. Falling back to in-memory MVP mode.');
  }
}

module.exports = { connectDatabase };
