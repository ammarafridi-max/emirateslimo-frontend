import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { BookingContext } from '../context/BookingContext';
import SearchLocations from './FormElements/SearchLocations';
import SelectDate from './FormElements/SelectDate';
import SelectTime from './FormElements/SelectTime';
import PrimaryButton from './PrimaryButton';
import SelectHours from './FormElements/SelectHours';
import toast from 'react-hot-toast';
import { useGetZoneByAddress } from '../hooks/useGetZoneByAddress';
import { useGetDistance } from '../hooks/useGetDistance';

export default function LimoForm() {
  const navigate = useNavigate();
  const { getZoneByAddress } = useGetZoneByAddress();
  const { getDistance } = useGetDistance();
  const { bookingData, setBookingData, validateLimoForm } =
    useContext(BookingContext);
  const { tripType } = bookingData;
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    setValue('pickup', bookingData.pickup);
    setValue('dropoff', bookingData.dropoff);
    setValue('pickupDate', bookingData.pickupDate);
    setValue('pickupTime', bookingData.pickupTime);
    setValue('hoursBooked', bookingData.hoursBooked);
  }, [bookingData, setValue]);

  async function onSubmit(data) {
    const error = validateLimoForm(data);
    if (error) return toast.error(error);

    try {
      const pickupZone = await getZoneByAddress({
        lat: data.pickup.lat,
        lng: data.pickup.lng,
      });

      let dropoffZone = null;

      if (tripType === 'distance' && data.dropoff?.lat && data.dropoff?.lng) {
        dropoffZone = await getZoneByAddress({
          lat: data.dropoff.lat,
          lng: data.dropoff.lng,
        });
      }

      toast.dismiss();

      if (!pickupZone) return toast.error('Pickup location not covered.');

      const distance = await getDistance({
        originLat: data?.pickup?.lat,
        originLng: data?.pickup?.lng,
        destLat: data?.dropoff?.lat,
        destLng: data?.dropoff?.lng,
      });

      setBookingData((prev) => ({
        ...prev,
        pickup: {
          ...data.pickup,
          zone: pickupZone?._id ? pickupZone?._id : null,
        },
        dropoff:
          {
            ...data.dropoff,
            zone: dropoffZone?._id ? dropoffZone?._id : null,
          } || null,
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
        hoursBooked: tripType === 'hourly' ? data?.hoursBooked : null,
        distance: distance?.distanceKm,
        tripDuration: distance?.durationMin,
      }));

      navigate('/book/select-limo');
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error('Something went wrong fetching zones.');
    }
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-md shadow-primary-900">
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
          />
          <SelectTime
            label="Pick-up time"
            name="pickupTime"
            register={register}
            setValue={setValue}
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
