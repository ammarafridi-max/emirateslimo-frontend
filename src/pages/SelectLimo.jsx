import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVehicles } from '../hooks/useVehicles';
import { BookingContext } from '../context/BookingContext';
import VehicleCard from '../components/VehicleCard';

export default function SelectLimo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { vehicles } = useVehicles();
  const { bookingData } = useContext(BookingContext);

  useEffect(() => {
    if (
      !bookingData.pickup.name ||
      !bookingData.dropoff.name ||
      !bookingData.pickupDate ||
      !bookingData.pickupTime
    ) {
      navigate('/');
    }
  }, [bookingData, navigate]);

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
