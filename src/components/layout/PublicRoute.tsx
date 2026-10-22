import { useAppSelector } from '../../store/hooks'
import { ROUTES } from '../../constants/routes';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthReady, selectUser } from '../../store/selectors';

export default function PublicRoute() {
    const user = useAppSelector(selectUser);
    const isReady = useAppSelector(selectIsAuthReady);

    if (!isReady) return null;
    return user ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />
}
