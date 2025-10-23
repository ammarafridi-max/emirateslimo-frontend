import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BookingContext = createContext();

export default function BookingProvider({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initialBookingData = {
    tripType: 'distance',
    pickup: { name: '', address: '', lat: '', lng: '', id: '', type: '' },
    dropoff: { name: '', address: '', lat: '', lng: '', id: '', type: '' },
    hoursBooked: 3,
    pickupDate: '',
    pickupTime: '',
    vehicle: '',
    bookingDetails: {
      firstName: 'Ammar',
      lastName: 'Afridi',
      email: '',
      phoneNumber: '',
      flightNumber: '',
      arrivalTime: '',
      message: '',
      paymentMethod: 'stripe',
      paymentStatus: 'UNPAID',
    },
    orderSummary: { vehiclePrice: 0, addOns: 0, total: 0 },
  };

  const [bookingData, setBookingData] = useState(initialBookingData);

  function validateLimoForm(data) {
    if (!data?.pickup?.name) return 'Please select your pickup location.';
    if (bookingData?.tripType === 'distance' && !data?.dropoff?.name)
      return 'Please select your drop-off location.';
    if (bookingData?.tripType === 'hourly' && !data?.hoursBooked)
      return 'Please select how many hours you’d like to book.';
    if (!data?.pickupDate) return 'Please select a pickup date.';
    if (!data?.pickupTime) return 'Please select a pickup time.';
    return null;
  }

  // Step Guards
  useEffect(() => {
    const { tripType, pickup, dropoff, pickupDate, pickupTime, hoursBooked } =
      bookingData;

    if (
      pathname.startsWith('/book/select-limo') ||
      pathname.startsWith('/book/contact-info')
    ) {
      if (
        tripType === 'distance' &&
        (!pickup?.name || !dropoff?.name || !pickupDate || !pickupTime)
      )
        navigate('/');
      if (
        tripType === 'hourly' &&
        (!pickup?.name || !hoursBooked || !pickupDate || !pickupTime)
      )
        navigate('/');
    }

    if (pathname.startsWith('/book/contact-info') && !bookingData.vehicle)
      navigate('/book/select-limo');
  }, [pathname, bookingData, navigate]);

  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, validateLimoForm }}
    >
      {children}
    </BookingContext.Provider>
  );
}
