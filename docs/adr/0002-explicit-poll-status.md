# 2. Persistência explícita do status da enquete

## Status

Aceito

## Contexto

O estado de uma enquete poderia ser determinado dinamicamente a partir das
datas de início (`startDate`) e término (`endDate`), eliminando a necessidade
de armazenar um campo de status no banco de dados.

Entretanto, essa abordagem concentra toda a lógica de estado nas consultas da
aplicação, dificultando a evolução das regras de negócio, a depuração de
problemas e a auditoria do ciclo de vida das enquetes.

Além disso, novos estados de negócio poderiam surgir futuramente (como
"Pausada", "Cancelada" ou "Arquivada"), tornando a lógica derivada cada vez
mais complexa.

## Decisão

Persistir o status da enquete utilizando um enum (`PollStatus`) contendo os
estados:

- `DRAFT`
- `SCHEDULED`
- `OPEN`
- `CLOSED`

As transições automáticas entre estados serão realizadas por um processo em
background (job agendado), responsável por atualizar o status conforme as
datas configuradas.

As regras de negócio utilizarão o status persistido como fonte de verdade para
operações como edição, votação e encerramento da enquete.

## Consequências

Positivas:

- Consultas mais simples e objetivas.
- Regras de negócio centralizadas em um único atributo.
- Facilita auditoria e depuração do ciclo de vida das enquetes.
- Permite evolução para novos estados sem alterar consultas existentes.

Negativas / trade-offs aceitos:

- Necessidade de um processo responsável pelas mudanças automáticas de estado.
- Possibilidade de inconsistências temporárias caso o job falhe, mitigada por
  monitoramento e reprocessamento.

## Alternativas consideradas

- Derivar completamente o status a partir das datas: descartado por aumentar a
  complexidade das regras e dificultar futuras evoluções.
- Calcular o status apenas na API: descartado por duplicar lógica entre
  diferentes endpoints e consumidores.
