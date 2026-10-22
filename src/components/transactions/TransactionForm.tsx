import { useState, type FormEvent } from 'react';
import { Calculator, CalendarDays } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTransaction } from '../../store/transactionsSlice';
import {
  selectActiveTab,
  selectCurrentBalance,
  selectIsBalanceConfirmed,
} from '../../store/selectors';
import { CATEGORIES } from '../../constants/categories';
import { formatDate, todayISO } from '../../utils/dates';
import { isAmountInput, parseAmount } from '../../utils/money';
import Button from '../ui/Button';
import Select from '../ui/Select';

const TEXTS = {
  expense: { description: 'Опис товару', category: 'Категорія товару' },
  income: { description: 'Опис доходу', category: 'Категорія доходу' },
};

export default function TransactionForm() {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectActiveTab);
  const isBalanceConfirmed = useAppSelector(selectIsBalanceConfirmed);
  const balance = useAppSelector(selectCurrentBalance);

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const today = todayISO();

  const reset = () => {
    setDescription('');
    setCategory('');
    setAmount('');
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = parseAmount(amount);

    if (!description.trim() || !category || value <= 0) {
      setError('Заповніть опис, категорію та суму');
      return;
    }

    if (type === 'expense') {
      if (!isBalanceConfirmed) {
        setError('Спочатку підтвердіть свій баланс');
        return;
      }
      if (value > balance) {
        setError('Недостатньо коштів на рахунку');
        return;
      }
    }

    dispatch(
      addTransaction({ type, date: today, description: description.trim(), category, amount: value })
    );
    reset();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-xs font-bold text-black">
          <CalendarDays aria-hidden="true" className="h-4 w-4 text-gray-500" />
          <time dateTime={today}>{formatDate(today)}</time>
        </div>

        <div className="flex h-10 min-w-0 flex-1 items-center rounded-full border border-gray-100 bg-white">
          <input
            aria-label={TEXTS[type].description}
            placeholder={TEXTS[type].description}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError('');
            }}
            className="h-full min-w-0 flex-1 bg-transparent px-5 text-xs font-medium text-black outline-none placeholder:text-gray-300"
          />

          <Select
            options={CATEGORIES[type]}
            value={category}
            onChange={(v) => {
              setCategory(v);
              setError('');
            }}
            placeholder={TEXTS[type].category}
            className="h-full w-48"
          />

          <label className="flex w-36 items-center gap-2 px-4">
            <input
              inputMode="decimal"
              aria-label="Сума"
              placeholder="0,00"
              value={amount}
              onChange={(e) => {
                if (isAmountInput(e.target.value)) {
                  setAmount(e.target.value);
                  setError('');
                }
              }}
              className="w-full bg-transparent text-right text-xs font-medium text-black outline-none placeholder:text-gray-300"
            />
            <Calculator aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-500" />
          </label>
        </div>

        <Button type="submit" className="h-10 min-w-[116px] bg-[#FF751D]">
          Ввести
        </Button>
        <Button variant="outline" onClick={reset} className="h-10 min-w-[116px]">
          Очистити
        </Button>
      </div>

      {error && (
        <p role="alert" className="mt-3 pl-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}