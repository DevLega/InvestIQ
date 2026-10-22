export const MONTHS_UA = [
    'СІЧЕНЬ', 'ЛЮТИЙ', 'БЕРЕЗЕНЬ', 'КВІТЕНЬ', 'ТРАВЕНЬ', 'ЧЕРВЕНЬ',
    'ЛИПЕНЬ', 'СЕРПЕНЬ', 'ВЕРЕСЕНЬ', 'ЖОВТЕНЬ', 'ЛИСТОПАД', 'ГРУДЕНЬ',
];

const pad = (n: number) => String(n).padStart(2, '0');

export const todayISO = () => {
    const now = new Date();
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

export const formatDate = (iso: string) => {
  const [year, month, day] = iso.slice(0, 10).split('-');
  return `${day}.${month}.${year}`;
};

export const getYear = (iso: string) => Number(iso.slice(0, 4));
export const getMonth = (iso: string) => Number(iso.slice(5, 7)) - 1;