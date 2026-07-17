import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { PrismaService } from './database/prisma.service.js';
import { NotFoundError } from './errors/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { router } from './routes/index.js';

// Inicializa a conexão com o banco antes de iniciar o servidor.
const prismaService = PrismaService.getInstance();
await prismaService.connect();

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

app.use(router);

// Middleware de tratamento para rotas inexistentes.
app.use((_req, _res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

/**
 * Finaliza a aplicação de forma controlada.
 *
 * Ao receber um sinal do sistema operacional, o servidor deixa de aceitar
 * novas conexões, encerra a conexão com o banco de dados e finaliza o processo.
 */
async function shutdown(signal: string) {
  logger.info(`${signal} received, shutting down gracefully`);
  server.close(async (err) => {
    try {
      if (err) throw err;
      await prismaService.disconnect();
      logger.info('Shutdown complete');
    } catch (error) {
      logger.error({ error }, 'Error during shutdown');
      process.exitCode = 1;
    }
  });
}

// Interrompe a aplicação quando o processo recebe Ctrl+C.
process.once('SIGINT', () => void shutdown('SIGINT'));

// Interrompe a aplicação quando o processo é encerrado pelo sistema.
process.once('SIGTERM', () => void shutdown('SIGTERM'));
