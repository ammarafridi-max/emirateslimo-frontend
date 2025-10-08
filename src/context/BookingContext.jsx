import { createContext, useState } from 'react';

export const BookingContext = createContext();

export default function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    pickup: {},
    dropoff: {},
    pickupDate: '',
    pickupTime: '',
    vehicleId: '',
    orderSummary: {
      vehiclePrice: 0,
      addOns: 0,
      total: 0,
    },
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}
