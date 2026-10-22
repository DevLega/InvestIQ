import clsx from 'clsx';
import { useAppSelector } from '../../store/hooks';
import { selectChartData } from '../../store/selectors';
import { formatMoneyShort } from '../../utils/money';

const CHART_HEIGHT = 280;
const GRID_LINES = 8;

export default function ReportChart() {
    const data = useAppSelector(selectChartData);

    if (data.length === 0) {
        return <p className="py-24 text-center text-sm text-gray-400">Немає даних за цей період</p>;
    }

    const max = data[0].total;

    return (
        <div className="relative mx-auto w-full max-w-[680px]">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-8 flex flex-col justify-between"
                style={{ height: CHART_HEIGHT }}
            >
                {Array.from({ length: GRID_LINES }, (_, i) => (
                    <span key={i} className="border-t border-gray-100" />
                ))}
            </div>

            <ul className="relative flex items-end justify-between gap-3 pt-8">
                {data.map((item, i) => (
                    <li key={item.label} className="flex min-w-0 flex-1 flex-col items-center">
                        <div className="flex w-full items-end justify-center" style={{ height: CHART_HEIGHT }}>
                            <div
                                className={clsx('relative w-9 rounded-t-xl', i % 3 === 0 ? 'bg-brand' : 'bg-brand-light')}
                                style={{ height: `${Math.max((item.total / max) * 100, 2)}%` }}
                            >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-gray-600">
                                    {formatMoneyShort(item.total)} грн
                                </span>
                            </div>
                        </div>

                        <span className="mt-3 max-w-full truncate text-[11px] text-gray-600" title={item.label}>
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}