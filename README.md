BD modelado:

HISTORICO(
  SENSOR FK,
  VALOR,
  TIMESTAMP
)

SENSOR(
  sensor,
  ambiente FK,
  mac_address,
  unidade_med,
  latitude,
  longiture,
  status
)

AMBIENTE(
  sig,
  descricao,
  ni,
  responsavel
)

