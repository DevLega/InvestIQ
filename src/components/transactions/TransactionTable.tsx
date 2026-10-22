import { Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeTransaction } from '../../store/transactionsSlice';
import { selectActiveTab, selectActiveTransactions } from '../../store/selectors';
import { getCategoryLabel } from '../../constants/categories';
import { formatDate } from '../../utils/dates';
import { formatMoney } from '../../utils/money';

const MIN_ROWS = 8;
const GRID = 'grid grid-cols-[110px_150px_170px_150px_44px] items-center gap-2 px-4';

export default function TransactionTable() {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectActiveTab);
  const items = useAppSelector(selectActiveTransactions);

  const emptyRows = Math.max(0, MIN_ROWS - items.length);
  const isExpense = type === 'expense';

  return (
    <div>
      <div className={clsx(GRID, 'rounded-t-2xl bg-surface py-3 text-xs font-bold uppercase text-black bg-[#F5F6FB]')}>
        <span>Дата</span>
        <span>Опис</span>
        <span>Категорія</span>
        <span>Сума</span>
        <span />
      </div>

      <div className="scroll-orange max-h-72 overflow-y-auto border-x border-gray-100">
        {items.map((t) => (
          <div key={t.id} className={clsx(GRID, 'h-9 border-b border-gray-100 text-xs text-gray-600')}>
            <span>{formatDate(t.date)}</span>
            <span className="min-w-0 truncate">{t.description}</span>
            <span className="truncate">{getCategoryLabel(t.type, t.category)}</span>
            <span className={clsx('font-bold', isExpense ? 'text-red-600' : 'text-green-700')}>
              {isExpense ? '-' : '+'} {formatMoney(t.amount)} грн.
            </span>
            <button
              type="button"
              aria-label="Видалити"
              onClick={() => dispatch(removeTransaction(t.id))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-surface hover:text-red-500"
            >
              <Trash2 aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        ))}

        {Array.from({ length: emptyRows }, (_, i) => (
          <div key={`empty-${i}`} className="h-9 border-b border-gray-100" />
        ))}
      </div>
    </div>
  );
}