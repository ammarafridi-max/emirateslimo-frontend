import { MdOutlineLuggage, MdOutlineMan2 } from 'react-icons/md';
import { useContext, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { FaImage } from 'react-icons/fa6';
import { HiOutlineStar } from 'react-icons/hi2';
import PrimaryButton from './PrimaryButton';
import VehicleGallery from './VehicleGallery';

export default function VehicleCard({ vehicle, disabled }) {
  const [showGallery, setShowGallery] = useState(false);
  const { bookingData, setBookingData } = useContext(BookingContext);
  const { tripType } = bookingData;

  const totalVehiclePrice =
    (vehicle?.pricing?.initialPrice || 0) +
    (vehicle?.pricing?.pricePerHour || 0) * 2;

  const vehicleSelected = bookingData.vehicle === vehicle?._id;

  function handleClick() {
    setBookingData((prev) => ({
      ...prev,
      vehicle: vehicle?._id,
      orderSummary: {
        ...prev.orderSummary,
        vehiclePrice: totalVehiclePrice,
      },
    }));
  }

  return (
    <>
      <div
        className={`group relative grid sm:grid-cols-[4.5fr_7.5fr] items-start gap-5 rounded-2xl bg-white/90 border border-primary-100 p-5 md:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 backdrop-blur-sm ${
          vehicleSelected ? 'ring-2 ring-primary-500/100' : ''
        }`}
      >
        {/* Vehicle Image */}
        <div className="relative hidden md:block w-full h-48 rounded-xl overflow-hidden">
          <VehicleImage vehicle={vehicle} setShowGallery={setShowGallery} />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between h-full">
          <VehicleTitlePrice
            tripType={tripType}
            vehicle={vehicle}
            totalVehiclePrice={totalVehiclePrice}
          />
          <Description vehicle={vehicle} />
          <QuickFacts vehicle={vehicle} />

          <PrimaryButton
            selected={vehicleSelected}
            size="small"
            onClick={handleClick}
            disabled={disabled}
            className="mt-2 w-fit"
          >
            {vehicleSelected ? 'Selected' : 'Select Vehicle'}
          </PrimaryButton>
        </div>
      </div>

      {showGallery && (
        <VehicleGallery
          vehicle={`${vehicle?.brand} ${vehicle.model}`}
          images={[vehicle?.featuredImage, ...(vehicle?.images || [])].filter(
            Boolean
          )}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
        />
      )}
    </>
  );
}

/* --------------------------- Subcomponents --------------------------- */

function VehicleTitlePrice({ vehicle, totalVehiclePrice, tripType }) {
  return (
    <div className="grid grid-cols-[4fr_8fr] items-center gap-3 md:block">
      {/* Mobile image */}
      <div className="block md:hidden bg-primary-100 rounded-lg overflow-hidden aspect-video">
        <img
          src={vehicle?.featuredImage}
          className="w-full h-full object-cover"
          alt={`${vehicle?.brand} ${vehicle?.model}`}
        />
      </div>

      <div>
        <h3 className="flex items-center text-[18px] md:text-[20px] font-light text-primary-900 mb-1">
          <span>
            {vehicle?.brand} {vehicle?.model}
          </span>
          {vehicle?.fuel?.toLowerCase() === 'hybrid' && (
            <span className="uppercase ml-3 text-[10px] bg-accent-100 text-accent-600 px-2 py-0.5 rounded-md">
              {vehicle?.fuel}
            </span>
          )}
        </h3>
        <p className="text-[15px] font-medium text-accent-500">
          AED {totalVehiclePrice}
          <span className="text-[13px] text-primary-400 font-light ml-1">
            / {tripType === 'distance' ? 'ride' : 'hour'}
          </span>
        </p>
      </div>
    </div>
  );
}

function VehicleImage({ vehicle, setShowGallery }) {
  return (
    <>
      <img
        src={vehicle?.featuredImage}
        alt={`${vehicle?.brand} ${vehicle?.model}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <button
        type="button"
        onClick={() => setShowGallery(true)}
        className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/80 hover:bg-white text-primary-700 hover:text-accent-600 duration-300 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm"
      >
        <FaImage className="text-[14px]" />
        <span className="text-[12px] font-light">View</span>
      </button>
    </>
  );
}

function Description({ vehicle }) {
  return (
    <p className="text-[15px] md:text-[14px] font-extralight text-primary-600 leading-relaxed mt-3 mb-4">
      {vehicle?.description?.slice(0, 130) ||
        'Travel in comfort and elegance with our luxury chauffeur-driven vehicles, perfect for any occasion.'}
    </p>
  );
}

function QuickFacts({ vehicle }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <Fact icon={MdOutlineLuggage} label={`${vehicle.luggage} Bags`} />
      <Fact icon={MdOutlineMan2} label={`${vehicle.passengers} Pax`} />
      <Fact icon={HiOutlineStar} label={`${vehicle?.class} ${vehicle?.type}`} />
    </div>
  );
}

function Fact({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1 bg-primary-100 px-2 py-1 rounded-md text-primary-500 hover:text-accent-500 transition-colors">
      <Icon className="text-[14px]" />
      <span className="text-[12.5px] font-light">{label}</span>
    </div>
  );
}
