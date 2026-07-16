# 1. Uso de multistage build no Dockerfile

## Status

Aceito

## Contexto

A imagem Docker da aplicação precisa suportar dois cenários distintos:
desenvolvimento local (hot-reload, devDependencies, ferramentas de lint/teste)
e produção (apenas o necessário para rodar o app compilado).

Um único Dockerfile "flat" (sem múltiplos estágios) resultaria em uma imagem
de produção contendo TypeScript, devDependencies (jest, eslint, typescript-eslint,
prettier, etc.) e código fonte não compilado — aumentando desnecessariamente
o tamanho da imagem e a superfície de ataque.

## Decisão

Adotar um Dockerfile multistage com 4 estágios:

- `base`: instala apenas os arquivos de dependência (cache de camadas)
- `development`: instala todas as deps (incluindo dev) e roda com hot-reload
- `build`: compila o TypeScript para JavaScript (dist/)
- `production`: imagem final, montada do zero, copiando apenas
  node_modules de produção e o dist/ compilado

O `docker-compose.yml` usa `target: development` para o ambiente local.
CI/CD e produção usam o estágio `production` (padrão, último do arquivo).

## Consequências

Positivas:

- Imagem de produção significativamente menor (estimado 3-5x menor
  comparado a uma imagem single-stage com todas as devDependencies)
- Menor superfície de ataque (sem TypeScript, sem ferramentas de build/lint
  em produção)
- Cache de camadas mais eficiente (mudanças de código não invalidam
  a camada de instalação de dependências)

Negativas / trade-offs aceitos:

- Dockerfile mais complexo de ler para quem não está familiarizado
  com multistage builds
- Build local um pouco mais lento na primeira execução (múltiplos estágios
  a construir), mitigado pelo cache de camadas em builds subsequentes

## Alternativas consideradas

- Dockerfile único (single-stage): descartado por gerar imagem de produção
  desnecessariamente grande e com ferramentas de desenvolvimento expostas.
- Dockerfiles separados (Dockerfile.dev / Dockerfile.prod): descartado por
  duplicar lógica comum (base, WORKDIR, COPY de package.json) entre os dois
  arquivos, dificultando manutenção.
