import { MdMan, MdOutlineLuggage } from 'react-icons/md';
import { useContext, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { FaImage } from 'react-icons/fa6';
import PrimaryButtonOutline from './PrimaryButtonOutline';
import VehicleGallery from './VehicleGallery';

export default function VehicleCard({ vehicle, disabled }) {
  const [showGallery, setShowGallery] = useState(false);
  const { bookingData, setBookingData } = useContext(BookingContext);
  const totalVehiclePrice =
    vehicle?.pricing?.initialPrice + vehicle?.pricing?.pricePerHour * 2;

  const vehicleSelected = bookingData.vehicleId === vehicle?._id;

  function handleClick() {
    setBookingData((prev) => ({
      ...prev,
      vehicleId: vehicle?._id,
      orderSummary: {
        ...prev.orderSummary,
        vehiclePrice: totalVehiclePrice,
      },
    }));
    console.log(bookingData);
  }

  console.log(vehicle);

  return (
    <>
      <div className="sm:grid grid-cols-[4.5fr_7.5fr] items-start gap-7 bg-transparent rounded-lg">
        <div className="relative w-full h-50 bg-primary-100 rounded-lg">
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="absolute bottom-2 right-2 flex items-center gap-2 bg-primary-200 hover:bg-primary-300 duration-300 cursor-pointer px-3 py-2 rounded-md"
          >
            <FaImage />
          </button>
        </div>
        <div>
          {/* <span className="flex items-center gap-2 text-[12px] text-primary-400 uppercase">
            {vehicle?.class} {vehicle?.type}
          </span> */}
          <h3 className="text-[20px] font-medium">
            {vehicle?.brand} {vehicle?.model}
          </h3>
          <p className="text-[17px] font-normal mb-2 text-primary-500">
            AED {totalVehiclePrice}
          </p>
          <p className="text-[15px] font-extralight leading-5 mt-2 mb-2">
            Luxury and premium sedans ideal for business travel or stylish city
            rides. Similar cars include BYD Han, and Tesla Model 3.
          </p>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <MdOutlineLuggage className="text-2xl" />
              <span className="text-sm">{vehicle.luggage}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdMan className="text-2xl" />
              <span className="text-sm">{vehicle.passengers}</span>
            </div>
          </div>
          <PrimaryButtonOutline
            selected={vehicleSelected}
            size="small"
            onClick={handleClick}
          >
            {vehicleSelected ? 'Selected' : 'Select Vehicle'}
          </PrimaryButtonOutline>
        </div>
      </div>
      {showGallery && (
        <VehicleGallery
          showGallery={showGallery}
          setShowGallery={setShowGallery}
        />
      )}
    </>
  );
}
