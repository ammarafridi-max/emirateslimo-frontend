import { Link, Outlet, useLocation } from 'react-router-dom';
import PrimarySection from './PrimarySection';
import Container from './Container';
import PrimaryLink from './PrimaryLink';
import Footer from './Footer';
import { useContext, useEffect, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { useVehicle } from '../hooks/useVehicle';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';

const steps = [
  {
    name: 'Choose Your Limo',
    page: '/book/select-limo',
  },
  {
    name: 'Contact Information',
    page: '/book/contact-info',
  },
  {
    name: 'Payment',
    page: '/book/payment',
  },
];

export default function BookingLayout() {
  const location = useLocation();
  const [cta, setCta] = useState({});
  const [title, setTitle] = useState('');
  const { bookingData, setBookingData } = useContext(BookingContext);

  useEffect(() => {
    if (location.pathname === '/book/select-limo') {
      setCta({ text: 'Enter Contact Information', link: '/book/contact-info' });
      setTitle('Choose Your Limo');
    }
    if (location.pathname === '/book/contact-info') {
      setCta({ text: 'Proceed to Payment', link: '/book/payment' });
      setTitle('Enter Contact Information');
    }
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{`${title} | Booking`}</title>
      </Helmet>
      <PrimarySection>
        <Steps />
        <Container className="pt-10 pb-20">
          <div className="sm:grid sm:grid-cols-[8.5fr_3.5fr] gap-6">
            <div>
              <Breadcrumb />
              <Outlet />
            </div>
            <SummaryBox cta={cta} />
          </div>
        </Container>
      </PrimarySection>
      <Footer />
    </>
  );
}

function Steps() {
  const location = useLocation();

  return (
    <div className="w-full h-fit flex justify-center gap-20 mx-auto bg-white z-50 py-5 shadow-md">
      {steps.map((item, i) => {
        const isActive = location.pathname === item.page;
        const isCompleted =
          steps.findIndex((step) => step.page === location.pathname) > i;

        return (
          <Link
            key={i}
            onClick={(e) => {
              if (!isCompleted && !isActive) e.preventDefault();
            }}
            to={item.page}
            className="flex flex-col items-center gap-2"
          >
            <span
              className={`w-8 h-8 text-sm flex items-center justify-center rounded-full transition-colors ${
                isActive
                  ? 'bg-black text-white'
                  : isCompleted
                    ? 'bg-green-600 text-white'
                    : 'bg-primary-100 text-primary-400'
              }`}
            >
              {isCompleted ? <FaCheck /> : i + 1}
            </span>
            <span
              className={`text-sm ${
                isActive
                  ? 'text-black font-medium'
                  : isCompleted
                    ? 'text-primary-900'
                    : 'text-primary-300'
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function SummaryBox({ cta }) {
  const { bookingData } = useContext(BookingContext);
  const { vehicle } = useVehicle(bookingData?.vehicleId);

  const pickupLocation = bookingData.pickup;
  const dropoffLocation = bookingData.dropoff;
  const pickupDate = bookingData.pickupDate;
  const pickupTime = bookingData.pickupTime;
  const orderSummary = bookingData.orderSummary;

  return (
    <div>
      <div className="h-fit p-4 mb-5 bg-primary-100 rounded-lg shadow-md shadow-primary-200 divide-y divide-primary-300">
        <div className="pb-3 mb-3">
          <label className="text-[12px] text-gray-500 uppercase font-light">
            Pickup Location
          </label>
          <p className="text-[15px] font-light">
            {pickupLocation.name
              ? `${pickupLocation.name} - ${pickupLocation.address}`
              : ''}
          </p>
        </div>
        <div className="pb-3 mb-3">
          <label className="text-[12px] text-gray-500 uppercase font-light">
            Dropoff Location
          </label>
          <p className="text-[15px] font-light">
            {dropoffLocation.name
              ? `${dropoffLocation.name} - ${dropoffLocation.address}`
              : ''}
          </p>
        </div>
        <div className="pb-3 mb-3">
          <label className="text-[12px] text-gray-500 uppercase font-light">
            Pickup Date & Time
          </label>
          <p className="text-[15px] font-light">
            {pickupDate
              ? format(new Date(pickupDate).toLocaleDateString(), 'dd LLLL y')
              : ''}
          </p>
        </div>
        {bookingData?.vehicleId && (
          <div className="pb-3">
            <label className="text-[12px] text-gray-500 uppercase font-light">
              Vehicle
            </label>
            <p className="text-[15px] font-light">
              {vehicle?.brand} {vehicle?.model}
            </p>
          </div>
        )}
      </div>
      <div className="mb-5">
        <h2 className="font-medium text-lg border-l-3 mb-2 px-2">
          Order Total
        </h2>
        <div className="flex items-center justify-between font-light px-2 border-l-2 border-transparent">
          <p>Limo Price: </p>
          <p>AED {orderSummary.vehiclePrice}</p>
        </div>
        <div className="flex items-center justify-between font-light px-2 border-l-2 border-transparent">
          <p>Extras Price: </p>
          <p>AED </p>
        </div>
      </div>
      <PrimaryLink
        className="w-full"
        disabled={!bookingData?.vehicleId}
        to={cta?.link}
      >
        {cta?.text}
      </PrimaryLink>
    </div>
  );
}

function Breadcrumb() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Choose Your Limo');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/book/select-limo') {
      setPageTitle('Choose Your Limo');
    }
    if (path === '/book/contact-info') {
      setPageTitle('Contact Information');
    }
  }, [location.pathname]);

  return (
    <div className="flex gap-2 items-center text-[15px] mb-7">
      <a className="text-primary-400" href="/">
        Home
      </a>
      <ChevronRight size={16} />
      <a className="text-primary-400">Book</a>
      <ChevronRight size={16} />
      {pageTitle}
    </div>
  );
}
