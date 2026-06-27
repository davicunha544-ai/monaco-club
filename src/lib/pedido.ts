export const STATUS_PEDIDO = [
  "pendente",
  "pago",
  "enviado",
  "entregue",
  "cancelado",
] as const;

export type StatusPedido = (typeof STATUS_PEDIDO)[number];
