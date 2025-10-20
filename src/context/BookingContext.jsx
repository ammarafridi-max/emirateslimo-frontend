import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BookingContext = createContext();

export default function BookingProvider({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const initialBookingData = {
    tripType: 'distance',
    pickup: {
      name: '',
      address: '',
      lat: '',
      lng: '',
      id: '',
      type: '',
    },
    dropoff: {
      name: '',
      address: '',
      lat: '',
      lng: '',
      id: '',
      type: '',
    },
    hoursBooked: 3,
    pickupDate: '',
    pickupTime: '',
    vehicle: '',
    bookingDetails: {
      firstName: 'Ammar',
      lastName: 'Afridi',
      email: '12:00 PM',
      phoneNumber: '',
      flightNumber: '',
      arrivalTime: '',
      message: '',
      paymentMethod: 'stripe',
      paymentStatus: 'UNPAID',
    },
    orderSummary: {
      vehiclePrice: 0,
      addOns: 0,
      total: 0,
    },
  };

  const [bookingData, setBookingData] = useState(initialBookingData);

  useEffect(() => {
    if (
      pathname.startsWith('/book/select-limo') ||
      pathname.startsWith('/book/contact-info')
    ) {
      const { tripType, pickup, dropoff, pickupDate, pickupTime, hoursBooked } =
        bookingData;

      if (tripType === 'distance') {
        if (!pickup?.name || !dropoff?.name || !pickupDate || !pickupTime) {
          navigate('/');
        }
      }

      if (tripType === 'hourly') {
        if (!pickup?.name || !hoursBooked || !pickupDate || !pickupTime) {
          navigate('/');
        }
      }
    }
  }, [pathname, bookingData, navigate]);

  useEffect(() => {
    if (pathname.startsWith('/book/contact-info')) {
      const { vehicle } = bookingData;
      if (!vehicle) navigate('/book/select-limo');
    }
  }, [pathname, bookingData, navigate]);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}
