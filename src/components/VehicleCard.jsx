import { useContext, useState } from 'react';
import { MdOutlineLuggage, MdOutlineMan2 } from 'react-icons/md';
import { FaImage, FaLeaf } from 'react-icons/fa6';
import { HiOutlineStar } from 'react-icons/hi2';
import { BookingContext } from '../context/BookingContext';
import { Tooltip } from 'react-tooltip';
import { CurrencyContext } from '../context/CurrencyContext';
import VehicleGallery from './VehicleGallery';

export default function VehicleCard({ vehicle }) {
  const { currency } = useContext(CurrencyContext);
  const { bookingData, handleSelectVehicle } = useContext(BookingContext);
  const { tripType, hoursBooked } = bookingData;
  const [showGallery, setShowGallery] = useState(false);

  const vehicleSelected = bookingData.vehicle === vehicle?.id;

  if (vehicle?.totalPrice === 0) return;

  return (
    <>
      <div
        onClick={() => handleSelectVehicle(vehicle)}
        className={`group relative grid sm:grid-cols-[3.5fr_8.5fr] items-start gap-5 rounded-2xl bg-white/90 border border-primary-100 p-4 lg:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 backdrop-blur-sm cursor-pointer ${
          vehicleSelected ? 'ring-2 ring-primary-900/100' : 'ring-1 ring-primary-900/10 hover:ring-primary-900/50'
        }`}
      >
        <div className="relative hidden lg:block w-full aspect-video rounded-xl overflow-hidden">
          <VehicleImage vehicle={vehicle} setShowGallery={setShowGallery} />
        </div>

        <div className="flex flex-col justify-between h-full">
          <VehicleTitlePrice
            currency={currency}
            tripType={tripType}
            vehicle={vehicle}
            vehiclePrice={vehicle?.totalPrice}
            hoursBooked={hoursBooked}
          />
          <Description vehicle={vehicle} />
          <QuickFacts vehicle={vehicle} />
          {/* 
          <PrimaryButtonOutline
            selected={vehicleSelected}
            size="small"
            onClick={handleClick}
            disabled={disabled}
            className="mt-2 w-fit relative right-0"
          >
            {vehicleSelected ? 'Selected' : 'Select Vehicle'}
          </PrimaryButtonOutline>
          */}
        </div>
      </div>

      {showGallery && (
        <VehicleGallery
          vehicle={`${vehicle?.brand} ${vehicle.model}`}
          images={[vehicle?.featuredImage, ...(vehicle?.images || [])].filter(Boolean)}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
        />
      )}
    </>
  );
}

function VehicleTitlePrice({ currency, vehicle, vehiclePrice, tripType, hoursBooked }) {
  return (
    <div className="grid grid-cols-[8.5fr_3.5fr] items-center gap-3 lg:block">
      <div>
        <h3 className="flex items-center text-[18px] lg:text-[20px] font-extralight text-primary-900 mb-0.5">
          <span>
            {vehicle?.brand} {vehicle?.model}
          </span>
        </h3>
        <p className="text-[15px] font-medium text-accent-600">
          {currency?.sign} {(vehiclePrice * currency?.conversionRate).toFixed(2)}
          <span className="text-[13px] text-primary-300 font-light ml-1">
            / {tripType === 'distance' ? 'ride' : `${hoursBooked} hours`}
          </span>
        </p>
      </div>
      <div className="block lg:hidden bg-primary-100 rounded-lg overflow-hidden aspect-video">
        <img
          src={vehicle?.featuredImage}
          className="w-full h-full object-cover"
          alt={`${vehicle?.brand} ${vehicle?.model}`}
        />
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
        className="absolute bottom-3 right-3 flex items-center gap-2 bg-white text-primary-700 hover:text-accent-600 duration-300 px-3 py-1.5 rounded-full shadow-sm cursor-pointer"
      >
        <FaImage className="text-[14px]" />
        <span className="text-[12px] font-light">View</span>
      </button>
    </>
  );
}

function Description({ vehicle }) {
  return (
    <p className="text-[14px] lg:text-[14px] font-extralight text-primary-600 leading-5 mt-3 mb-4">
      {vehicle?.description?.slice(0, 130) ||
        'Travel in comfort and elegance with our luxury chauffeur-driven vehicles, perfect for any occasion.'}
    </p>
  );
}

function QuickFacts({ vehicle }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-0 lg:mb-3">
      <Tooltip className="text-sm" id="my-tooltip" />
      <div data-tooltip-id="my-tooltip" data-tooltip-content="Fits up to 3 luggage bags">
        <Fact icon={MdOutlineLuggage} label={`${vehicle.luggage}`} />
      </div>
      <div data-tooltip-id="my-tooltip" data-tooltip-content="Fits up to 3 passengers">
        <Fact icon={MdOutlineMan2} label={`${vehicle.passengers}`} />
      </div>
      <Fact icon={HiOutlineStar} label={`${vehicle?.class} ${vehicle?.type}`} />
    </div>
  );
}

function Fact({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1 bg-primary-100 px-2 py-1 rounded-md text-primary-500 transition-colors">
      <Icon className="text-[14px]" />
      <span className="text-[12.5px] font-light">{label}</span>
    </div>
  );
}
