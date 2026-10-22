import type { InputHTMLAttributes } from 'react';
import Input from './Input';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: string;
    marked?: boolean;
}

export default function FormField({
    label,
    name,
    error,
    marked,
    ...inputProps
}: FormFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-xs font-medium text-black">
                {marked && <span className="text-red-500">*</span>}
                {label}
            </label>

            <Input id={name} name={name} hasError={!!error} {...inputProps} />

            {error && <p className="pl-1 text-[10px] text-red-500">{error}</p>}
        </div>
    );
}