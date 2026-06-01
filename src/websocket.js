import { Server } from 'socket.io';
import logger from './utils/logger.js';

let io;

export const initWebSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3001',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    logger.info(`🔌 WebSocket connected: ${socket.id}`);

    socket.on('subscribe', (userId) => {
      socket.join(`user-${userId}`);
      logger.info(`User ${userId} subscribed to updates`);
    });

    socket.on('disconnect', () => {
      logger.info(`🔌 WebSocket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const broadcastMetrics = (userId, metrics) => {
  if (io) {
    io.to(`user-${userId}`).emit('metrics-update', metrics);
  }
};

export const broadcastPost = (userId, post) => {
  if (io) {
    io.to(`user-${userId}`).emit('post-published', post);
  }
};

export const getIO = () => io;