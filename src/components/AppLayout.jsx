import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className="h-dvh w-full flex flex-col m-0 p-0">
      <Navigation />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
