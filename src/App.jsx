import '@fontsource-variable/outfit?display=swap';
import 'react-tooltip/dist/react-tooltip.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Layout
import AppLayout from './components/AppLayout';
import BookingLayout from './components/BookingLayout';

// Context
import BookingProvider from './context/BookingContext';
import CurrencyProvider from './context/CurrencyContext';

// Pages
import Home from './pages/Home';
import DubaiAirportTransfer from './pages/DubaiAirportTransfer';
import ChauffeurService from './pages/ChauffeurService';
import Fleet from './pages/Fleet';

// Booking
import SelectLimo from './pages/SelectLimo';
import BookingDetails from './pages/BookingDetails';
import Payment from './pages/Payment';

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
            <CurrencyProvider>
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
                    <Route path="payment" element={<Payment />} />
                  </Route>
                  <Route path="book/select-limo" element={<SelectLimo />} />
                  <Route
                    path="book/booking-details"
                    element={<BookingDetails />}
                  />
                </Routes>
              </BookingProvider>
            </CurrencyProvider>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}
