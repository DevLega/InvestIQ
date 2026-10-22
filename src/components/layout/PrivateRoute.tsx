import { useAppSelector } from '../../store/hooks'
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { selectIsAuthReady, selectUser } from '../../store/selectors';
import Loader from '../ui/Loader';

export default function PrivateRoute() {
    const user = useAppSelector(selectUser);
    const isReady = useAppSelector(selectIsAuthReady);

    if (!isReady) return <Loader />;
    return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}
