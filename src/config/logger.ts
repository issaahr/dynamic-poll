import pino from 'pino';
import { env } from './env.js';

/**
 * Configuração do logger utilizando o Pino.
 *
 * O nível de log é definido com base na variável de ambiente NODE_ENV.
 * Em desenvolvimento, os logs são formatados para facilitar a leitura.
 * Em produção, os logs seguem um formato estruturado, adequado para
 * agregação e monitoramento.
 */
export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  ...(env.NODE_ENV === 'development'
    ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
    : {}),
});
