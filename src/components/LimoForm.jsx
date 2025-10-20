import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import SearchLocations from './FormElements/SearchLocations';
import SelectDate from './FormElements/SelectDate';
import SelectTime from './FormElements/SelectTime';
import PrimaryButton from './PrimaryButton';
import SelectHours from './FormElements/SelectHours';

export default function LimoForm() {
  const navigate = useNavigate();
  const { bookingData, setBookingData } = useContext(BookingContext);
  const { tripType, pickup, dropoff, pickupTime, pickupDate } = bookingData;
  const { register, handleSubmit, setValue, watch } = useForm();

  function onSubmit(data) {
    console.log(data);
    setBookingData((prev) => ({
      ...prev,
      pickup: data.pickup,
      dropoff: data.dropoff,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
    }));

    console.log(bookingData);

    navigate(
      `/book/select-limo?pickupName=${data.pickup?.name}&pickupLat=${data.pickup?.lat}&pickupLng=${data.pickup?.lng}&pickupDate=${data.pickupDate}&dropoffName=${data.dropoff?.name}&dropoffLat=${data.dropoff?.lat}&dropoffLng=${data.dropoff?.lng}`
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Trip Type Switch */}
      <div className="flex">
        <button
          type="button"
          onClick={() =>
            setBookingData((prev) => ({
              ...prev,
              tripType: 'distance',
            }))
          }
          className={`w-1/2 text-center py-3 text-[15px] font-medium transition-all duration-300 rounded-2xl cursor-pointer ${
            tripType === 'distance'
              ? 'bg-primary-100 text-black'
              : 'bg-white text-primary-500 hover:text-accent-500'
          }`}
        >
          Point-to-Point
        </button>
        <button
          type="button"
          onClick={() =>
            setBookingData((prev) => ({
              ...prev,
              tripType: 'hourly',
            }))
          }
          className={`w-1/2 text-center py-3 text-[15px] font-medium transition-all duration-300 rounded-2xl cursor-pointer ${
            tripType === 'hourly'
              ? 'bg-primary-100 text-black'
              : 'bg-white text-primary-300 hover:text-primary-900'
          }`}
        >
          Hourly
        </button>
      </div>

      {/* Booking Form */}
      <form
        className="flex flex-col gap-4 p-6 md:p-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Locations */}
        <SearchLocations
          register={register}
          setValue={setValue}
          watch={watch}
          name="pickup"
        />
        {tripType === 'distance' && (
          <SearchLocations
            label="Drop-off location"
            register={register}
            setValue={setValue}
            watch={watch}
            name="dropoff"
          />
        )}
        {tripType === 'hourly' && (
          <SelectHours
            label="Duration"
            placeholder="Select hours"
            name="hoursBooked"
            register={register}
            setValue={setValue}
          />
        )}

        {/* Date & Time */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-4">
          <SelectDate
            label="Pick-up date"
            placeholder="Select date"
            name="pickupDate"
            register={register}
            setValue={setValue}
          />
          <SelectTime
            label="Pick-up time"
            placeholder="Select time"
            name="pickupTime"
            register={register}
            setValue={setValue}
          />
        </div>

        {/* Submit Button */}
        <PrimaryButton
          type="submit"
          size="large"
          className="mt-2 font-medium tracking-wide"
        >
          Search
        </PrimaryButton>
      </form>
    </div>
  );
}
