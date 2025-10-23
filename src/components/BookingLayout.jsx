import { Outlet, useLocation, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import BookingSteps from './BookingSteps';
import BookingSummary from './BookingSummary';
import PrimarySection from './PrimarySection';
import Container from './Container';
import Footer from './Footer';

export default function BookingLayout() {
  const location = useLocation();
  const [cta, setCta] = useState({});
  const [title, setTitle] = useState('');
  const { bookingData, setBookingData } = useContext(BookingContext);

  useEffect(() => {
    if (location.pathname === '/book/select-limo') {
      setCta({
        text: 'Enter Contact Information',
        link: '/book/booking-details',
      });
      setTitle('Choose Your Limo');
    }
    if (location.pathname === '/book/booking-details') {
      setCta({ text: 'Proceed to Payment', link: '/book/payment' });
      setTitle('Booking Details');
    }
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{`${title} | Booking`}</title>
      </Helmet>
      <Navigation />
      <Body cta={cta} />
      <Footer />
    </>
  );
}

function Navigation() {
  return (
    <PrimarySection className="bg-white relative py-3 md:py-5 shadow-md shadow-gray-200 z-50">
      <Container className="md:grid md:grid-cols-[2fr_8fr_2fr] items-center h-fit">
        <a className="hidden md:block" href="/">
          <img src="/logo-light.png" className="w-full object-contain" />
        </a>
        <BookingSteps />
        <div className="hidden md:flex justify-end gap-3">
          <button className="flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-md cursor-pointer duration-300 hover:bg-primary-200">
            <FaWhatsapp />
            <span className="text-[14px] font-light">Chat With Us</span>
          </button>
        </div>
      </Container>
    </PrimarySection>
  );
}

function Body({ cta }) {
  return (
    <PrimarySection className="bg-gray-50">
      <Container className="sm:grid sm:grid-cols-[8.5fr_3.5fr] w-[95%] gap-6 py-4 md:pt-10 md:pb-20">
        <div>
          <Breadcrumb />
          <Outlet />
        </div>
        <BookingSummary cta={cta} />
      </Container>
    </PrimarySection>
  );
}

function Breadcrumb() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Choose Your Limo');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/book/select-limo') setPageTitle('Choose Your Limo');
    if (path === '/book/booking-details') setPageTitle('Booking Details');
  }, [location.pathname]);

  return (
    <div className="hidden md:flex items-center gap-2 text-[13px] md:text-[14.5px] font-light text-primary-500 mb-4 md:mb-7">
      <Link
        to="/"
        className="text-primary-400 hover:text-accent-500 transition-colors duration-200"
      >
        Home
      </Link>

      <ChevronRight size={15} className="text-primary-300" />

      <Link
        to="/book"
        className="text-primary-400 hover:text-accent-500 transition-colors duration-200"
      >
        Book
      </Link>

      <ChevronRight size={15} className="text-primary-300" />

      <span className="text-primary-900 font-normal">{pageTitle}</span>
    </div>
  );
}
