import { useContext, useEffect } from 'react';
import { BookingContext } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

export default function ContactInformation() {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !bookingData.pickup.name ||
      !bookingData.dropoff.name ||
      !bookingData.pickupDate ||
      !bookingData.pickupTime
    ) {
      navigate('/');
    }
    if (!bookingData.vehicleId) navigate('/book/select-limo');
  }, [bookingData, navigate]);

  return <div>Contact information</div>;
}
