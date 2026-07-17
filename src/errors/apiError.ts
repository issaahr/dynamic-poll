/**
 * Classe base para erros operacionais da aplicação.
 *
 * Permite associar um código HTTP e identificar erros esperados,
 * que podem ser tratados pelo middleware global de erros.
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
