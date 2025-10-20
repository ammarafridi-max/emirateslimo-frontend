import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import { useVehicle } from '../hooks/useVehicle';
import { format } from 'date-fns';
import PrimaryLink from './PrimaryLink';

export default function BookingSummary({ cta }) {
  const { bookingData } = useContext(BookingContext);
  const {
    tripType,
    hoursBooked,
    pickup,
    dropoff,
    pickupDate,
    pickupTime,
    orderSummary,
    vehicle,
  } = bookingData;
  const { vehicle: vehicleData } = useVehicle(vehicle);

  return (
    <div>
      {/* Booking Details */}
      <div className="h-fit p-4 my-5 md:mt-0 bg-white rounded-xl border border-primary-100 shadow-[0_4px_25px_rgba(0,0,0,0.05)] divide-y divide-primary-100">
        {tripType === 'distance' && (
          <Detail label="Trip Type" value="Point-to-Point" />
        )}
        {tripType === 'hourly' && <Detail label="Trip Type" value="Hourly" />}
        {tripType === 'hourly' && <Detail label="Hours" value={hoursBooked} />}
        <Detail label="Pickup Location" value={pickup?.name} />
        {tripType === 'distance' && (
          <Detail label="Dropoff Location" value={dropoff?.name} />
        )}
        <Detail
          label="Pickup Date & Time"
          value={
            pickupDate
              ? `${format(new Date(pickupDate), 'dd LLLL yyyy')} @ ${
                  pickupTime || '10:00 AM Dubai Time'
                }`
              : ''
          }
        />
        {vehicle && (
          <Detail
            label="Vehicle Selected"
            value={`${vehicleData?.brand || ''} ${vehicleData?.model || ''}`}
          />
        )}
      </div>

      {/* Order Summary (DO NOT CHANGE SIZE) */}
      <div className="mb-5 bg-white rounded-xl border border-primary-100 shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden">
        <h2 className="font-medium text-lg px-4 pt-4 pb-2 border-l-[3px] border-accent-500/80 text-primary-900">
          Order Total
        </h2>
        <div className="flex flex-col gap-1 pb-4">
          <div className="flex items-center justify-between font-light text-sm px-4">
            <p className="text-primary-500">Limo Price</p>
            <p className="text-primary-900 font-medium">
              AED {orderSummary?.vehiclePrice || 0}
            </p>
          </div>
          <div className="flex items-center justify-between font-light text-sm px-4">
            <p className="text-primary-500">Extras Price</p>
            <p className="text-primary-900 font-medium">AED 0</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <PrimaryLink
        className="w-full"
        disabled={!cta?.link || !bookingData?.vehicle}
        to={cta?.link}
      >
        {cta?.text}
      </PrimaryLink>

      {/* Terms Note */}
      <p className="text-center text-[12px] mt-3 font-extralight px-3 text-primary-500">
        By proceeding, you agree to our{' '}
        <a
          href="/terms-conditions"
          className="text-accent-600 hover:text-accent-700 underline-offset-2 hover:underline"
        >
          Terms & Conditions
        </a>{' '}
        and our{' '}
        <a
          href="/privacy-policy"
          className="text-accent-600 hover:text-accent-700 underline-offset-2 hover:underline"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="py-2">
      <label className="text-[12px] text-primary-400 uppercase font-light tracking-wide block mb-0.5">
        {label}
      </label>
      <p className="text-[15px] font-light text-primary-900">{value || '—'}</p>
    </div>
  );
}
