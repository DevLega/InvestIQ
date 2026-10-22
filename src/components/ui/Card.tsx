import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('rounded-[30px] bg-white shadow-[0_20px_60px_rgba(15,31,75,0.06)]', className)}
      {...props}
    />
  );
}