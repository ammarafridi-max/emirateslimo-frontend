import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import { BookingContext } from '../context/BookingContext';
import BookingSteps from './BookingSteps';
import BookingSummary from './BookingSummary';
import PrimarySection from './PrimarySection';
import Container from './Container';
import Footer from './Footer';
import Currency from './Currency';

export default function BookingLayout() {
  const { handleNext, pageTitle, btn } = useContext(BookingContext);

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | Booking`}</title>
      </Helmet>

      <PrimarySection className="bg-white relative py-3 md:py-5 shadow-md shadow-gray-200 z-50">
        <Container className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_8fr_2fr] items-center h-fit">
          <a className="hidden md:block" href="/">
            <img src="/logo-light.png" className="w-full object-contain" />
          </a>
          <BookingSteps />
          <div className="flex justify-end gap-3">
            <Currency />
          </div>
        </Container>
      </PrimarySection>

      <PrimarySection className="bg-gray-50">
        <Container className="py-4 md:pt-6 md:pb-10">
          <Breadcrumb pageTitle={pageTitle} />
          <div className="sm:grid sm:grid-cols-[8.5fr_3.5fr] gap-6">
            <Outlet />
            <BookingSummary
              btnText={btn?.text}
              btnOnClick={handleNext}
              btnDisabled={btn?.disabled}
            />
          </div>
        </Container>
      </PrimarySection>

      <Footer />
    </>
  );
}

function Breadcrumb({ pageTitle }) {
  return (
    <div className="hidden md:flex items-center gap-2 text-[13px] md:text-[14.5px] font-light text-primary-500 mb-4 md:mb-6">
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
