import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { nextMonth, prevMonth } from '../../store/reportsSlice';
import { selectReportMonth, selectReportYear } from '../../store/selectors';
import { MONTHS_UA } from '../../utils/dates';
import Stepper from '../ui/Stepper';

export default function MonthSlider() {
  const dispatch = useAppDispatch();
  const month = useAppSelector(selectReportMonth);
  const year = useAppSelector(selectReportYear);

  const now = new Date();
  const isLatest = year * 12 + month >= now.getFullYear() * 12 + now.getMonth();

  return (
    <div className="flex flex-col items-center gap-1 justify-self-end">
      <span className="text-[11px] text-gray-500">Поточний період</span>

      <Stepper
        prevLabel="Попередній місяць"
        nextLabel="Наступний місяць"
        onPrev={() => dispatch(prevMonth())}
        onNext={() => dispatch(nextMonth())}
        nextDisabled={isLatest}
      >
        <div className="w-24 text-center text-xs font-bold leading-tight text-black">
          <p>{MONTHS_UA[month]}</p>
          <p>{year}</p>
        </div>
      </Stepper>
    </div>
  );
}