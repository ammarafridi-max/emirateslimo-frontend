import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';

export default function AppLayout() {
  return (
    <div className="h-dvh w-full flex flex-col m-0 p-0">
      <MobileNavigation />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}
