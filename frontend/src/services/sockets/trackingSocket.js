import { io } from 'socket.io-client';

export const trackingSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  autoConnect: false,
  transports: ['websocket']
});
