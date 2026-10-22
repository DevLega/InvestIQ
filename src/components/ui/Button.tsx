import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
}

const variants: Record<Variant, string> = {
    primary: 'bg-brand text-white shadow-md shadow-brand/30 hover:brightness-95',
    secondary: 'bg-surface text-gray-600 shadow-md hover:bg-gray-100',
    outline: 'border border-gray-200 bg-white text-gray-600 hover:border-brand hover:text-brand',
};

export default function Button({
    variant = 'primary',
    className,
    type = 'button',
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={clsx(
                'rounded-2xl px-6 py-3 text-xs  font-bold uppercase tracking-wide transition cursor-pointer',
                'disabled:cursor-not-allowed disabled:opacity-50',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}