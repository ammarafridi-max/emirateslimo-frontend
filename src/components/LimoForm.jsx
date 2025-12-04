import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { BookingContext } from '../context/BookingContext';
import SearchLocations from './FormElements/SearchLocations';
import SelectDate from './FormElements/SelectDate';
import SelectTime from './FormElements/SelectTime';
import PrimaryButton from './PrimaryButton';
import SelectHours from './FormElements/SelectHours';
import toast from 'react-hot-toast';

export default function LimoForm() {
  const { bookingData, setBookingData, submitLimoForm, isLoadingLimoForm } = useContext(BookingContext);
  const { tripType } = bookingData;
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  function validateLimoForm(data) {
    if (!data?.pickup?.name) return 'Please select your pickup location.';
    if (tripType === 'distance' && !data?.dropoff?.name) return 'Please select your drop-off location.';
    if (tripType === 'hourly' && !data?.hoursBooked) return 'Please select how many hours you’d like to book.';
    if (!data?.pickupDate) return 'Please select a pickup date.';
    if (!data?.pickupTime) return 'Please select a pickup time.';
    return null;
  }

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
    const error = validateLimoForm(data);
    if (error) return toast.error(error);
    submitLimoForm(data);
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex p-1 rounded-t-2xl">
        {['distance', 'hourly'].map((type) => {
          const active = tripType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setBookingData((prev) => ({ ...prev, tripType: type }))}
              className={`
                w-1/2 text-center py-2.5 text-[15px] rounded-xl transition-all cursor-pointer
                ${active ? 'bg-primary-900/7 shadow-sm font-medium text-black' : 'text-gray-500 hover:text-black'}
              `}
            >
              {type === 'distance' ? 'Point-to-Point' : 'Hourly'}
            </button>
          );
        })}
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4 p-5 md:p-6" onSubmit={handleSubmit(onSubmit)}>
        <SearchLocations label="Pick-up location" register={register} setValue={setValue} watch={watch} name="pickup" />

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
          className="mt-1 font-medium tracking-wide"
          disabled={isLoadingLimoForm}
        >
          Search
        </PrimaryButton>
      </form>
    </div>
  );
}
