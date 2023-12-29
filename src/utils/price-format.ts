export function priceFormat(value: number) {
  const transformValueWithCents = value / 100;

  return transformValueWithCents.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
