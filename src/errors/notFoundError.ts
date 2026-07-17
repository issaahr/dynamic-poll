import { ApiError } from './apiError.js';

/**
 * Erro lançado quando o recurso solicitado não é encontrado.
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}
