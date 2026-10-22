import { Outlet } from 'react-router-dom';
import Header from './Header';
import PageBackground from './PageBackground';

export default function MainLayout() {
  return (
    <PageBackground>
      <Header />
      <main>
        <Outlet />
      </main>
    </PageBackground>
  );
}