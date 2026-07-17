import { z } from 'zod';

/**
 * Validação e tipagem das variáveis de ambiente da aplicação.
 *
 * A inicialização falha caso alguma variável obrigatória esteja ausente
 * ou possua um formato inválido.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
