import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import PrimarySection from './PrimarySection';
import Container from './Container';
import PrimaryLink from './PrimaryLink';
import { useContext, useEffect, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { useVehicle } from '../hooks/useVehicle';
import { Helmet } from 'react-helmet-async';

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
      <PrimarySection className="py-10">
        <Container>
          <div className="flex flex-col gap-10">
            <Steps />
            <div className="sm:grid sm:grid-cols-[8.5fr_3.5fr] gap-6">
              <div>
                <Outlet />
              </div>
              <SummaryBox cta={cta} />
            </div>
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}

function Steps() {
  return (
    <div className="flex justify-center gap-20">
      {steps.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <span
            className={`w-10 h-10 flex items-center justify-center rounded-full ${location?.pathname === item.page ? 'bg-black text-white' : 'bg-primary-100'}`}
          >
            {i + 1}
          </span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

function SummaryBox({ cta }) {
  const { bookingData } = useContext(BookingContext);
  const { vehicle } = useVehicle(bookingData?.vehicleId);

  const pickupLocation = bookingData.pickup.name;
  const dropoffLocation = bookingData.dropoff.name;
  const pickupDate = bookingData.pickupDate;

  return (
    <div>
      <div className="h-fit p-4 mb-5 bg-primary-100 rounded-lg shadow-md shadow-primary-200">
        <div className="pb-3 mb-3 border-b border-b-gray-400">
          <label className="text-[12px] text-gray-500 uppercase font-light">
            Pickup Location
          </label>
          <p className="text-[15px] font-light">{pickupLocation}</p>
        </div>
        <div className="pb-3 mb-3 border-b border-b-gray-400">
          <label className="text-[12px] text-gray-500 uppercase font-light">
            Dropoff Location
          </label>
          <p className="text-[15px] font-light">{dropoffLocation}</p>
        </div>
        <div className="pb-3 mb-3 border-b border-b-gray-400">
          <label className="text-[12px] text-gray-500 uppercase font-light">
            Pickup Date & Time
          </label>
          <p className="text-[15px] font-light">{pickupDate}</p>
        </div>
        <div className="pb-3 mb-3">
          <label className="text-[12px] text-gray-500 uppercase font-light">
            Vehicle
          </label>
          <p className="text-[15px] font-light">
            {vehicle?.year} {vehicle?.brand} {vehicle?.model}
          </p>
        </div>
      </div>
      <PrimaryLink className="w-full">{cta?.text}</PrimaryLink>
    </div>
  );
}
