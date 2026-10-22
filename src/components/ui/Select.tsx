import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export default function Select({ options, value, onChange, placeholder, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={clsx('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-full w-full items-center justify-between gap-2 px-5 text-xs"
      >
        <span className={clsx('truncate', selected ? 'font-medium text-black' : 'text-gray-300')}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={clsx('h-4 w-4 shrink-0 text-gray-400 transition', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-30 max-h-80 w-full overflow-y-auto bg-white py-1 shadow-[0_8px_24px_rgba(15,31,75,0.12)]"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={clsx(
                  'block w-full px-5 py-2 text-left text-xs transition hover:bg-surface hover:text-black',
                  option.value === value ? 'bg-surface text-black' : 'text-gray-400'
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}