import { PrismaClient } from '@prisma/client';
import { logger } from '../config/logger.js';

/**
 * Serviço responsável por gerenciar a instância única do PrismaClient.
 *
 * A implementação utiliza o padrão Singleton para evitar a criação de
 * múltiplas conexões com o banco de dados durante a execução da aplicação.
 */
export class PrismaService {
  private static instance: PrismaService;
  public readonly client: PrismaClient;

  private constructor() {
    this.client = new PrismaClient();
  }

  /**
   * Retorna a única instância do PrismaService.
   */
  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  /**
   * Estabelece a conexão com o banco de dados.
   */
  public async connect(): Promise<void> {
    await this.client.$connect();
    logger.info('Database connected');
  }

  /**
   * Encerra a conexão com o banco de dados.
   */
  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
    logger.info('Database disconnected');
  }
}
