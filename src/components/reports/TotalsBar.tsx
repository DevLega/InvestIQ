import { useAppSelector } from '../../store/hooks';
import { selectMonthTotals } from '../../store/selectors';
import { formatMoney } from '../../utils/money';

export default function TotalsBar() {
  const { expense, income } = useAppSelector(selectMonthTotals);

  return (
    <div className="mt-5 flex items-center justify-center rounded-full bg-white py-3.5 text-xs text-[#52555F] shadow-[0_10px_40px_rgba(15,31,75,0.06)]">
      <p className="px-8">
        <span className="font-medium">Витрати:</span>
        <span className="ml-3 font-bold text-red-500">- {formatMoney(expense)} грн.</span>
      </p>

      <span aria-hidden="true" className="h-6 w-px bg-gray-200" />

      <p className="px-8">
        <span className="font-medium">Доходи:</span>
        <span className="ml-3 font-bold text-green-700">+ {formatMoney(income)} грн.</span>
      </p>
    </div>
  );
}