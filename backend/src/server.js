const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { connectDatabase } = require('./config/db');
const { env } = require('./config/env');
const { registerSocketHandlers } = require('./sockets');

async function bootstrap() {
  await connectDatabase();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: env.frontendUrl,
      credentials: true
    }
  });

  registerSocketHandlers(io);

  server.listen(env.port, () => {
    console.log(`HomeBites API running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
