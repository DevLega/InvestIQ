import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideNotification } from '../../store/notificationSlice';

export default function Notification() {
    const dispatch = useAppDispatch();
    const { message, type } = useAppSelector((state) => state.notification);

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => dispatch(hideNotification()), 3000);
        return () => clearTimeout(timer);
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <div
            className={`fixed right-6 top-6 z-50 rounded-xl px-5 py-3 text-sm text-white shadow-lg ${type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-600' : 'bg-[#0F1F4B]'
                }`}
        >
            {message}
        </div>
    );
}