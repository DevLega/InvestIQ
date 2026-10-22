import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

export default function Input({ hasError, className, ...props }: InputProps) {
    return (
        <input
            className={clsx(
                'w-full rounded-full border border-transparent bg-surface px-5 py-3 text-sm text-black outline-none transition',
                'placeholder:text-gray-400 focus:border-brand',
                hasError && 'border-red-400',
                className
            )}
            {...props}
        />
    );
}