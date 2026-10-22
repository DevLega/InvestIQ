export const round2 = (n: number) => Math.round(n * 100) / 100;

// 55000 -> "55 000.00"
export const formatMoney = (value: number) =>
  value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// "12,5" -> 12.5
export const parseAmount = (value: string) => {
  const n = Number(value.replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
};

export const isAmountInput = (value: string) => /^\d*([.,]\d{0,2})?$/.test(value);