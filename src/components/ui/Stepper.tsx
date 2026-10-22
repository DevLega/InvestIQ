import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepperProps {
  children: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  nextDisabled?: boolean;
}

const arrowClass =
  'flex h-6 w-6 items-center justify-center rounded-full text-brand transition hover:bg-brand/10 disabled:opacity-30 disabled:hover:bg-transparent';

export default function Stepper({
  children,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  nextDisabled,
}: StepperProps) {
  return (
    <div className="flex items-center gap-3">
      <button type="button" aria-label={prevLabel} onClick={onPrev} className={arrowClass}>
        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
      </button>

      {children}

      <button
        type="button"
        aria-label={nextLabel}
        onClick={onNext}
        disabled={nextDisabled}
        className={arrowClass}
      >
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}