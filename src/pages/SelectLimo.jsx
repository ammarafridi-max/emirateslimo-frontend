import { useSearchParams } from 'react-router-dom';
import { useVehicles } from '../hooks/useVehicles';
import VehicleCard from '../components/VehicleCard';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export default function SelectLimo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { vehicles } = useVehicles();
  const { setBookingData, bookingData } = useContext(BookingContext);

  console.log(bookingData);

  return (
    <div className="flex flex-col gap-6">
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
