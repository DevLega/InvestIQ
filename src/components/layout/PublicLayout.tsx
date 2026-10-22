import { Outlet } from 'react-router-dom';
import Header from './Header';
import PageBackground from './PageBackground';

export default function PublicLayout() {
    return (
        <PageBackground iconsPos='top'>
            <Header />
            <main>
                <Outlet />
            </main>
        </PageBackground>
    );
}