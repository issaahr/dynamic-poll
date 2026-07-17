import type { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.js';
import { ApiError } from '../errors/index.js';

/**
 * Middleware global responsável por tratar erros da aplicação.
 *
 * Erros do tipo ApiError retornam o código HTTP correspondente.
 * Erros inesperados são registrados em log e respondem com HTTP 500.
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    logger.warn({ err }, err.message);
    return res.status(err.statusCode).json({ message: err.message });
  }

  logger.error({ err }, 'Erro inesperado');
  return res.status(500).json({ message: 'Erro interno do servidor' });
}
