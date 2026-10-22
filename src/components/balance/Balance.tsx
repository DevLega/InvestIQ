import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { confirmBalance } from '../../store/balanceSlice';
import { selectCurrentBalance, selectIsBalanceConfirmed } from '../../store/selectors';
import { formatMoney, isAmountInput, parseAmount } from '../../utils/money';
import Button from '../ui/Button';
import ConfirmModal from '../ui/ConfirmModal';

function BalanceHint() {
  return (
    <div
      role="status"
      className="absolute left-1/2 top-full z-20 mt-3 w-52 -translate-x-1/2 rounded-2xl bg-[#1D346A] p-4 text-left text-xs leading-snug text-white shadow-lg"
    >
      <span
        aria-hidden="true"
        className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-navy"
      />
      <p>Привіт! Для початку роботи внесіть свій поточний баланс рахунку!</p>
      <p className="mt-2 text-[10px] text-white/80">
        Ви не можете витрачати гроші, поки їх у Вас немає :)
      </p>
    </div>
  );
}

export default function Balance() {
  const dispatch = useAppDispatch();
  const isConfirmed = useAppSelector(selectIsBalanceConfirmed);
  const currentBalance = useAppSelector(selectCurrentBalance);

  const [draft, setDraft] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const draftValue = parseAmount(draft);

  const handleConfirm = () => {
    dispatch(confirmBalance(draftValue));
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <span>Баланс:</span>

      <div className="relative">
        <div className="flex h-10 min-w-[132px] items-center justify-center gap-1 rounded-full border border-gray-100 bg-white px-5 font-bold text-black shadow-sm">
          {isConfirmed ? (
            <span>{formatMoney(currentBalance)} UAH</span>
          ) : (
            <>
              <input
                aria-label="Поточний баланс"
                inputMode="decimal"
                placeholder="00.00"
                value={draft}
                onChange={(e) => isAmountInput(e.target.value) && setDraft(e.target.value)}
                className="w-16 bg-transparent text-right outline-none placeholder:text-gray-400"
              />
              <span>UAH</span>
            </>
          )}
        </div>

        {!isConfirmed && <BalanceHint />}
      </div>

      <Button
        variant="outline"
        disabled={isConfirmed || draftValue <= 0}
        onClick={() => setIsModalOpen(true)}
      >
        Підтвердити
      </Button>

      {isModalOpen && (
        <ConfirmModal
          title="Ви впевнені?"
          onConfirm={handleConfirm}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}