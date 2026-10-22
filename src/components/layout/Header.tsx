import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutThunk } from '../../store/authSlice';
import { selectUser } from '../../store/selectors';
import { ROUTES } from '../../constants/routes';
import ConfirmModal from '../ui/ConfirmModal';
import logo from '../../assets/logo.svg';

export default function Header() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const userName = user?.displayName || user?.email || 'User Name';
    const initial = userName.charAt(0).toUpperCase();

    const handleLogout = () => {
        setIsLogoutOpen(false);
        dispatch(logoutThunk());
    };

    return (
        <>
            <header className="flex items-center justify-between bg-white px-6 py-3 w-full">
                <Link to={ROUTES.HOME} aria-label="InvestIQ, на головну">
                    <img src={logo} alt="InvestIQ" className="h-7" />
                </Link>

                {user && <div className="flex items-center text-sm text-[#52555F]">
                    <div className="flex items-center gap-3 pr-5">
                        <span
                            aria-hidden="true"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-xs font-medium text-black"
                        >
                            {initial}
                        </span>
                        <span className="max-w-40 truncate">{userName}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsLogoutOpen(true)}
                        className="border-l-2 border-[#E0E5EB] pl-5 underline transition hover:text-brand"
                    >
                        Вийти
                    </button>
                </div>}

            </header>

            {isLogoutOpen && (
                <ConfirmModal
                    title="Ви дійсно хочете вийти?"
                    onConfirm={handleLogout}
                    onCancel={() => setIsLogoutOpen(false)}
                />
            )}
        </>
    );
}