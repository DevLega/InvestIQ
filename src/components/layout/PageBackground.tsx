import type { ReactNode } from 'react';
import clsx from 'clsx';
import BackgroundIcons, { type IconsPos } from './BackgroundIcons';

type Variant = 'default' | 'compact';

const variants: Record<Variant, string> = {
  default: 'h-2/3 rounded-bl-[128px]',
  compact: 'h-[420px] rounded-bl-[96px]',
};

interface PageBackgroundProps {
  children: ReactNode;
  variant?: Variant;
  iconsPos?: IconsPos;
  className?: string;
}

export default function PageBackground({
  children,
  variant = 'default',
  iconsPos = 'bottom',
  className,
}: PageBackgroundProps) {
  return (
    <div className={clsx('relative min-h-screen overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className={clsx('fixed absolute inset-x-0 top-0 z-0 bg-[#F5F6FB]', variants[variant])}
      />

      <BackgroundIcons iconsPos={iconsPos} />

      <div className="relative z-10">{children}</div>
    </div>
  );
}