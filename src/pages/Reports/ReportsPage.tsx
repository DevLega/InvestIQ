import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import Balance from '../../components/balance/Balance';
import Card from '../../components/ui/Card';
import MonthSlider from '../../components/reports/MonthSlider';
import TotalsBar from '../../components/reports/TotalsBar';
import CategoryList from '../../components/reports/CategoryList';
import ReportChart from '../../components/reports/ReportChart';

export default function ReportsPage() {
  return (
    <div className="mx-auto w-full max-w-[920px] px-6 pb-16 pt-8">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-3 text-xs text-gray-500 transition hover:text-brand"
        >
          <ArrowLeft aria-hidden="true" className="h-5 w-5 text-brand" />
          Повернутись на головну
        </Link>

        <Balance />
        <MonthSlider />
      </div>

      <TotalsBar />

      <Card className="mt-6 px-8 py-8">
        <CategoryList />
      </Card>

      <Card className="mt-6 px-8 pb-8 pt-10">
        <ReportChart />
      </Card>
    </div>
  );
}