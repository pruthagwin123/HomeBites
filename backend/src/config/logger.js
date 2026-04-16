function logger(message, meta = {}) {
  console.log(`[HomeBites] ${message}`, meta);
}

module.exports = { logger };
