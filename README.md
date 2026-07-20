# Dynamic Poll

Sistema de enquetes em tempo real desenvolvido em **Node.js**, **TypeScript** e **Express** como estudo de arquitetura backend, boas práticas de engenharia de software e desenvolvimento de APIs.

O projeto tem como objetivo ir além do escopo original do desafio técnico, priorizando organização, escalabilidade e documentação das decisões arquiteturais.

---

## Tecnologias

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Docker & Docker Compose
- Zod
- Pino
- Swagger (em desenvolvimento)
- Jest (em desenvolvimento)

---

## Arquitetura

Atualmente o projeto utiliza uma arquitetura em camadas, separando responsabilidades entre:

```
src/
├── config/
├── database/
├── errors/
├── middlewares/
├── routes/
├── services/
├── generated/
└── app.ts
```

Durante a evolução do projeto novas camadas poderão ser adicionadas conforme a complexidade aumentar.

---

## Principais decisões arquiteturais

As principais decisões do projeto são registradas através de **Architecture Decision Records (ADR)**.

Atualmente estão documentadas:

- Docker multistage build
- Persistência explícita do status das enquetes
- Atualizações em tempo real utilizando Server-Sent Events (SSE)
- Utilização de Soft Delete
- Modelagem de votos como entidade própria

Os ADRs podem ser encontrados em:

```
docs/adr/
```

---

## Modelo de domínio

O domínio é composto inicialmente pelas seguintes entidades:

- Poll
- Option
- Vote

Uma enquete pode possuir múltiplas opções.

Cada opção possui diversos votos.

O ciclo de vida da enquete é representado pelo enum:

- DRAFT
- SCHEDULED
- OPEN
- CLOSED

---

## Funcionalidades planejadas

- [ ] CRUD de enquetes
- [ ] CRUD de opções
- [ ] Sistema de votação
- [ ] Atualização em tempo real via SSE
- [ ] Documentação Swagger
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Validações com Zod
- [ ] Autenticação (em avaliação)

---

## Executando o projeto

### Clonar

```bash
git clone https://github.com/issaahr/dynamic-poll

cd dynamic-poll
```

### Configurar ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Configure as variáveis necessárias.

### Executar com Docker

```bash
docker compose up
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

## Estrutura do banco

O banco é gerenciado pelo Prisma.

Gerar migration:

```bash
npx prisma migrate dev
```

Abrir o Prisma Studio:

```bash
npx prisma studio
```

---

## Status do projeto

🚧 Em desenvolvimento.

Este projeto está sendo construído incrementalmente, com foco em qualidade de código, documentação e arquitetura, registrando as principais decisões durante sua evolução.
