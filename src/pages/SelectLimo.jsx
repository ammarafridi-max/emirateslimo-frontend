import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVehicles } from '../hooks/useVehicles';
import { BookingContext } from '../context/BookingContext';
import VehicleCard from '../components/VehicleCard';
import VehicleLoadingCard from '../components/VehicleLoadingCard';

export default function SelectLimo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { vehicles, isLoadingVehicles } = useVehicles();
  const { bookingData } = useContext(BookingContext);
  const { tripType } = bookingData;

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
