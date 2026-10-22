import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAuthError, loginThunk, registerThunk } from '../../store/authSlice';
import { selectAuthError, selectAuthStatus } from '../../store/selectors';
import Button from '../ui/Button';
import FormField from '../ui/FormField.tsx';
import GoogleButton from './GoogleButton';

type Field = 'email' | 'password';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const REQUIRED = "це обов'язкове поле";

export default function AuthForm() {
    const dispatch = useAppDispatch();
    const serverError = useAppSelector(selectAuthError);
    const isPending = useAppSelector(selectAuthStatus) === 'pending';

    const [values, setValues] = useState<Values>({ email: '', password: '' });
    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement & { name: Field };

        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        if (serverError) dispatch(clearAuthError());
    };

    const validate = (): boolean => {
        const next: Errors = {};
        if (!values.email.trim()) next.email = REQUIRED;
        if (!values.password) next.password = REQUIRED;

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const getCredentials = () =>
        validate() ? { email: values.email.trim(), password: values.password } : null;

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const credentials = getCredentials();
        if (credentials) dispatch(loginThunk(credentials));
    };

    const handleRegister = () => {
        const credentials = getCredentials();
        if (credentials) dispatch(registerThunk(credentials));
    };

    return (
        <form
            onSubmit={handleLogin}
            noValidate
            className="flex w-full max-w-[375px] flex-col gap-5 rounded-[40px] bg-white px-14 py-12 shadow-[0_20px_60px_rgba(15,31,75,0.08)]"
        >
            <section className="flex flex-col items-center gap-3">
                <p className="self-start text-[11px] leading-snug tracking-wide text-[#52555F] sm:text-center">
                    Ви можете авторизуватися за допомогою акаунта Google
                </p>
                <GoogleButton />
            </section>

            <p className="text-[11px] leading-snug tracking-wide text-[#52555F]">
                Або увійти за допомогою ел. пошти та паролю після реєстрації
            </p>

            <div className="flex flex-col gap-4">
                <FormField
                    label="Електронна пошта:"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={values.email}
                    error={errors.email}
                    onChange={handleChange}
                    className='bg-[#F6F7FB]'
                />

                <FormField
                    label="Пароль:"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    marked
                    value={values.password}
                    error={errors.password}
                    onChange={handleChange}
                    className='bg-[#F6F7FB]'
                />
            </div>

            {serverError && <p className="text-xs text-red-500">{serverError}</p>}

            <div className="flex gap-3">
                <Button type="submit" disabled={isPending} className="flex-1 bg-[#FF751D]">
                    Увійти
                </Button>
                <Button
                    variant="secondary"
                    disabled={isPending}
                    onClick={handleRegister}
                    className="flex-1"
                >
                    Реєстрація
                </Button>
            </div>
        </form>
    );
}