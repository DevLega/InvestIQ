import { useAppSelector } from '../../store/hooks';
import { selectMonthlySummary } from '../../store/selectors';
import { MONTHS_UA } from '../../utils/dates';
import { formatMoney } from '../../utils/money';

export default function Summary() {
  const rows = useAppSelector(selectMonthlySummary);

  return (
    <aside className="w-[214px] shrink-0 overflow-hidden rounded-2xl bg-[#F5F6FB]">
      <h2 className="py-3 text-center text-xs font-bold uppercase text-black">Зведення</h2>

      <ul>
        {rows.map(({ month, total }) => (
          <li
            key={month}
            className="flex items-center justify-between border-t border-white px-5 py-2.5 text-xs text-gray-600"
          >
            <span>{MONTHS_UA[month]}</span>
            <span>{formatMoney(total)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}