import { Link } from "react-router-dom";
import { ChartNoAxesColumn } from 'lucide-react';
import Balance from "../../components/balance/Balance";
import { ROUTES } from "../../constants/routes";
import type { TransactionType } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setActiveTab } from "../../store/transactionsSlice";
import Tabs from "../../components/ui/Tabs";
import { selectActiveTab } from "../../store/selectors";
import TransactionForm from "../../components/transactions/TransactionForm";
import TransactionTable from "../../components/transactions/TransactionTable";
import Summary from "../../components/transactions/Summary";

const TABS: { value: TransactionType; label: string }[] = [
  { value: 'expense', label: 'Витрати' },
  { value: 'income', label: 'Дохід' },
]

export default function HomePage() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  return (
    <div className="mx-auto w-full max-w-[1040px] px-6 pb-16 pt-8">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div />
        <Balance />
        <Link
          to={ROUTES.REPORTS}
          className="flex items-center gap-3 justify-self-end text-xs text-gray-500 transition hover:text-brand"
        >
          Перейти до розрахунків
          <ChartNoAxesColumn aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8">
        <Tabs
          items={TABS}
          value={activeTab}
          onChange={(tab) => dispatch(setActiveTab(tab))}
        />

        <section className="rounded-3xl rounded-tl-none bg-white p-8 shadow-[0_20px_60px_rgba(15,31,75,0.06)]">
          <TransactionForm key={activeTab} />

          <div className="mt-10 flex items-start gap-8">
            <TransactionTable />

            <Summary />

          </div>
        </section>
      </div>


    </div>
  )
}
