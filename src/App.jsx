import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './components/AppLayout';

import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import SelectLimo from './pages/SelectLimo';
import BookingLayout from './components/BookingLayout';
import BookingProvider from './context/BookingContext';
import ContactInformation from './pages/ContactInformation';
import DubaiAirportTransfer from './pages/DubaiAirportTransfer';
import ChauffeurService from './pages/ChauffeurService';

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
        <BookingProvider>
          <HelmetProvider>
            <BrowserRouter>
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
                </Route>
                <Route path="book" element={<BookingLayout />}>
                  <Route path="select-limo" element={<SelectLimo />} />
                  <Route path="contact-info" element={<ContactInformation />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </HelmetProvider>
        </BookingProvider>
      </QueryClientProvider>
    </>
  );
}
