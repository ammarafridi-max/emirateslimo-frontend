import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAvailableVehicles } from '../hooks/useAvailableVehicles';
import { BookingContext } from '../context/BookingContext';
import VehicleCard from '../components/VehicleCard';
import VehicleLoadingCard from '../components/VehicleLoadingCard';

export default function SelectLimo() {
  const [searchParams] = useSearchParams();
  const { bookingData } = useContext(BookingContext);
  const { tripType } = bookingData;
  const { vehicles, isLoadingVehicles, isErrorVehicles, errorVehicles } =
    useAvailableVehicles(bookingData);

  if (isErrorVehicles)
    return <p>Error loading vehicles: {errorVehicles.message}</p>;

  return (
    <div className="flex flex-col gap-3">
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
  );
}
