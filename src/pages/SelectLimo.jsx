import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAvailableVehicles } from '../hooks/useAvailableVehicles';
import { BookingContext } from '../context/BookingContext';
import { Helmet } from 'react-helmet-async';
import VehicleCard from '../components/VehicleCard';
import VehicleLoadingCard from '../components/VehicleLoadingCard';
import BookingLayout from '../components/BookingLayout';
import Breadcrumb from '../components/Breadcrumb';
import BookingSummary from '../components/BookingSummary';

export default function SelectLimo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { bookingData } = useContext(BookingContext);
  const { tripType, pickup, dropoff, pickupDate, pickupTime, hoursBooked } =
    bookingData;
  const { vehicles, isLoadingVehicles, isErrorVehicles, errorVehicles } =
    useAvailableVehicles(bookingData);

  if (isErrorVehicles)
    return <p>Error loading vehicles: {errorVehicles.message}</p>;

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Helmet>
        <title>Choose Your Limo</title>
      </Helmet>
      <BookingLayout>
        <div>
          <Breadcrumb
            paths={[
              { label: 'Home', href: '/' },
              { label: 'Book', href: '/' },
              { label: 'Choose Your Limo', href: '/book/select-limo' },
            ]}
          />
          <div className="flex flex-col gap-5 lg:gap-3">
            {tripType === 'hourly' && <p>For hourly rides...</p>}
            {isLoadingVehicles && (
              <>
                <VehicleLoadingCard />
                <VehicleLoadingCard />
                <VehicleLoadingCard />
              </>
            )}
            {vehicles?.map((vehicle) => (
              <VehicleCard
                key={vehicle?.id}
                vehicle={vehicle}
                disabled={searchParams.get('vehicleId') === vehicle._id}
              />
            ))}
          </div>
        </div>
        <div>
          <BookingSummary
            btnText="Enter Contact Details"
            btnDisabled={!bookingData?.vehicle}
            btnOnClick={() => navigate('/book/booking-details')}
          />
        </div>
      </BookingLayout>
    </>
  );
}
