# 4. Modelagem de votos como entidade própria

## Status

Aceito

## Contexto

O escopo inicial da aplicação poderia ser atendido armazenando apenas um
contador de votos em cada opção da enquete.

Entretanto, essa abordagem elimina a rastreabilidade dos votos e dificulta a
implementação de funcionalidades futuras, como validação de voto único,
auditoria, estatísticas ou reversão de votos.

## Decisão

Modelar cada voto como uma entidade independente (`Vote`), relacionada à opção
escolhida.

A quantidade de votos será obtida a partir da coleção de votos associados à
opção, evitando duplicação de informações.

A entidade também poderá armazenar informações adicionais, como um identificador
do votante (`voterToken`), permitindo evolução futura sem alterações
estruturais significativas.

## Consequências

Positivas:

- Elimina duplicação entre contador e registros de votação.
- Permite auditoria completa dos votos realizados.
- Facilita implementação de voto único ou múltiplo.
- Suporta futuras funcionalidades estatísticas e analíticas.

Negativas / trade-offs aceitos:

- Consultas exigem agregação para obtenção da quantidade de votos.
- Pequeno aumento no número de registros armazenados.

## Alternativas consideradas

- Armazenar apenas um contador (`votes`) na tabela de opções: descartado por
  dificultar auditoria, validação e evolução da aplicação.
- Manter simultaneamente contador e registros de voto: descartado por introduzir
  duplicação de informações e necessidade de sincronização entre ambos.
