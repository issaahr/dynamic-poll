# 3. Utilização de Soft Delete nas entidades do domínio

## Status

Aceito

## Contexto

As entidades do sistema representam informações que podem possuir relevância
histórica ou administrativa, mesmo após serem removidas pelos usuários.

Uma exclusão física imediata dificultaria recuperação de dados, auditoria e
investigação de possíveis inconsistências.

## Decisão

Adotar Soft Delete utilizando o campo `deletedAt` nas entidades persistidas.

A exclusão realizada pelos usuários apenas marcará o registro como removido.

A remoção definitiva ficará sob responsabilidade de um processo posterior de
limpeza, permitindo retenção temporária dos dados.

## Consequências

Positivas:

- Possibilidade de recuperação de registros removidos.
- Maior facilidade para auditoria e investigação de problemas.
- Preservação temporária do histórico antes da exclusão definitiva.
- Processo de limpeza pode ser configurado conforme regras futuras de retenção.

Negativas / trade-offs aceitos:

- Todas as consultas deverão considerar registros não removidos.
- Pequeno aumento no volume de dados armazenados até execução do processo de
  limpeza.

## Alternativas consideradas

- Exclusão física imediata: descartada por eliminar qualquer possibilidade de
  recuperação ou auditoria.
- Campo booleano (`isDeleted`): descartado por fornecer menos contexto do que
  um timestamp e dificultar políticas de retenção baseadas em tempo.
