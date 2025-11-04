import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { BookingContext } from '../context/BookingContext';
import SearchLocations from './FormElements/SearchLocations';
import SelectDate from './FormElements/SelectDate';
import SelectTime from './FormElements/SelectTime';
import PrimaryButton from './PrimaryButton';
import SelectHours from './FormElements/SelectHours';

export default function LimoForm() {
  const { bookingData, setBookingData, submitLimoForm } =
    useContext(BookingContext);
  const { tripType } = bookingData;
  const { register, handleSubmit, getValues, setValue, watch, reset } =
    useForm();

  useEffect(() => {
    reset({
      pickup: bookingData?.pickup,
      dropoff: bookingData?.dropoff,
      pickupDate: bookingData?.pickupDate,
      pickupTime: bookingData?.pickupTime,
      hoursBooked: bookingData?.hoursBooked,
    });
  }, [bookingData, reset]);

  function onSubmit(data) {
    submitLimoForm(data);
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg shadow-primary-300 md:shadow-none">
      {/* Trip Type Switch */}
      <div className="flex">
        {['distance', 'hourly'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setBookingData((p) => ({ ...p, tripType: type }))}
            className={`w-1/2 text-center py-3 text-[15px] font-medium transition-all rounded-2xl ${
              tripType === type
                ? 'bg-primary-100 text-black'
                : 'bg-white text-primary-400 hover:text-accent-500'
            }`}
          >
            {type === 'distance' ? 'Point-to-Point' : 'Hourly'}
          </button>
        ))}
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-4 p-6 md:p-7"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <div className="flex flex-col xl:flex-row xl:items-center gap-4">
          <SelectDate
            label="Pick-up date"
            name="pickupDate"
            register={register}
            setValue={setValue}
            defaultValue={bookingData?.pickupDate}
          />
          <SelectTime
            label="Pick-up time"
            name="pickupTime"
            register={register}
            setValue={setValue}
            defaultValue={bookingData?.pickupTime}
          />
        </div>

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
