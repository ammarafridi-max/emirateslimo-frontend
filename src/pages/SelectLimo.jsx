import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVehicles } from '../hooks/useVehicles';
import { BookingContext } from '../context/BookingContext';
import VehicleCard from '../components/VehicleCard';
import VehicleLoadingCard from '../components/VehicleLoadingCard';
import { useAvailableVehicles } from '../hooks/useAvailableVehicles';

export default function SelectLimo() {
  const [searchParams] = useSearchParams();
  const { bookingData } = useContext(BookingContext);
  const { tripType } = bookingData;
  const { vehicles, isLoadingVehicles, isErrorVehicles, errorVehicles } =
    useAvailableVehicles(bookingData);

  useEffect(() => {
    console.log(bookingData);

    if (vehicles?.length) console.log('Vehicles loaded:', vehicles);
  }, [vehicles]);

  if (isLoadingVehicles) return <p>Loading available vehicles...</p>;

  if (isErrorVehicles)
    return <p>Error loading vehicles: {errorVehicles.message}</p>;

  return (
    <div className="flex flex-col gap-6">
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
          key={vehicle?._id}
          vehicle={vehicle}
          disabled={searchParams.get('vehicleId') === vehicle._id}
        />
      ))}
    </div>
  );
}
