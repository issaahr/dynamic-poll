# 5. Atualização em tempo real utilizando Server-Sent Events (SSE)

## Status

Aceito

## Contexto

O sistema precisa atualizar a quantidade de votos das enquetes em tempo real,
sem necessidade de atualização manual da página.

As principais alternativas avaliadas foram Polling, WebSocket e
Server-Sent Events (SSE).

Como o fluxo de comunicação ocorre apenas do servidor para o cliente após uma
votação, uma comunicação bidirecional não é necessária.

## Decisão

Utilizar Server-Sent Events (SSE) para transmissão dos eventos de atualização
dos votos.

Após uma votação válida, o servidor enviará um evento para todos os clientes
inscritos na enquete correspondente, permitindo atualização imediata da
interface.

## Consequências

Positivas:

- Implementação mais simples que WebSocket.
- Menor consumo de recursos comparado ao Polling.
- Comunicação baseada em HTTP, facilitando integração com proxies e
  balanceadores.
- Reconexão automática suportada pelos navegadores.

Negativas / trade-offs aceitos:

- Comunicação unidirecional (servidor → cliente).
- Não é indicado para aplicações que exijam troca constante de mensagens entre
  cliente e servidor.

## Alternativas consideradas

- Polling: descartado por gerar requisições periódicas desnecessárias,
  aumentando consumo de banda e processamento.
- WebSocket: descartado por introduzir maior complexidade para um cenário onde
  apenas o servidor envia atualizações.
