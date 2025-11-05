import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';
import ContactBanner from './ContactBanner';

export default function AppLayout() {
  return (
    <div className="h-dvh w-full flex flex-col m-0 p-0">
      <MobileNavigation />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <ContactBanner />
      <Footer />
    </div>
  );
}
