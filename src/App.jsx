import 'react-tooltip/dist/react-tooltip.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Layout
import AppLayout from './components/AppLayout';
import BookingLayout from './components/BookingLayout';

// Context
import BookingProvider from './context/BookingContext';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import DubaiAirportTransfer from './pages/DubaiAirportTransfer';
import ChauffeurService from './pages/ChauffeurService';
import Fleet from './pages/Fleet';

// Booking
import SelectLimo from './pages/SelectLimo';
import BookingDetails from './pages/BookingDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300 * 1000,
    },
  },
});

export default function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HelmetProvider>
          <BrowserRouter>
            <BookingProvider>
              <ScrollToTop />
              <Routes>
                <Route element={<AppLayout />}>
                  <Route index element={<Home />} />
                  <Route
                    path="dubai-airport-transfer"
                    element={<DubaiAirportTransfer />}
                  />
                  <Route
                    path="chauffeur-service"
                    element={<ChauffeurService />}
                  />
                  <Route path="fleet" element={<Fleet />} />
                </Route>
                <Route path="book" element={<BookingLayout />}>
                  <Route path="select-limo" element={<SelectLimo />} />
                  <Route path="booking-details" element={<BookingDetails />} />
                </Route>
              </Routes>
            </BookingProvider>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}
