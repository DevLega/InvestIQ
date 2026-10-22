import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleCategory, toggleType } from '../../store/reportsSlice';
import {
  selectCategoryTotals,
  selectReportCategory,
  selectReportType,
} from '../../store/selectors';
import { CATEGORIES } from '../../constants/categories';
import { CATEGORY_ICONS } from '../../constants/categoryIcons';
import { formatMoney } from '../../utils/money';
import Stepper from '../ui/Stepper';

interface CategoryItemProps {
  label: string;
  amount: number;
  icon: (typeof CATEGORY_ICONS)[string];
  isActive: boolean;
  onClick: () => void;
}

function CategoryItem({ label, amount, icon: Icon, isActive, onClick }: CategoryItemProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className="group flex w-[110px] flex-col items-center gap-2"
    >
      <span className="text-[11px] text-gray-600">{formatMoney(amount)}</span>

      <span
        className={clsx(
          'flex h-14 w-14 items-center justify-center rounded-full transition',
          isActive ? 'bg-brand-light/60 text-brand' : 'bg-surface text-navy group-hover:text-brand'
        )}
      >
        <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.5} />
      </span>

      <span className="flex min-h-8 items-start text-center text-[11px] uppercase leading-tight text-gray-600">
        {label}
      </span>
    </button>
  );
}

export default function CategoryList() {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectReportType);
  const activeCategory = useAppSelector(selectReportCategory);
  const totals = useAppSelector(selectCategoryTotals);

  const handleToggleType = () => dispatch(toggleType());

  return (
    <div>
      <div className="flex justify-center">
        <Stepper
          prevLabel="Попередній тип"
          nextLabel="Наступний тип"
          onPrev={handleToggleType}
          onNext={handleToggleType}
        >
          <h2 className="w-24 text-center text-xs font-bold uppercase text-black">
            {type === 'expense' ? 'Витрати' : 'Доходи'}
          </h2>
        </Stepper>
      </div>

      <ul className="mx-auto mt-8 flex max-w-[800px] flex-wrap justify-center gap-x-6 gap-y-6">
        {CATEGORIES[type].map((category) => (
          <li key={category.value}>
            <CategoryItem
              label={category.label}
              amount={totals[category.value] ?? 0}
              icon={CATEGORY_ICONS[category.value]}
              isActive={activeCategory === category.value}
              onClick={() => dispatch(toggleCategory(category.value))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}