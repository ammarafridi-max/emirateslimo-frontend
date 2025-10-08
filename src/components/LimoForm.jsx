import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { forwardRef, useContext } from 'react';
import { FaClock } from 'react-icons/fa6';
import SearchLocations from './FormElements/SearchLocations';
import PrimaryButton from './PrimaryButton';
import SelectDate from './FormElements/SelectDate';
import SelectTime from './FormElements/SelectTime';
import { BookingContext } from '../context/BookingContext';
import TimePicker from 'react-time-picker';

export default function LimoForm() {
  const navigate = useNavigate();
  const { setBookingData } = useContext(BookingContext);
  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: {
      pickupTime: '10:00',
    },
  });

  function onSubmit(data) {
    setBookingData((prev) => ({
      ...prev,
      pickup: data.pickup,
      dropoff: data.dropoff,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
    }));

    navigate(
      `/book/select-limo?pickupName=${data.pickup.name}&pickupLat=${data.pickup.lat}&pickupLng=${data.pickup.lng}&pickupDate=${data.pickupDate}&dropoffName=${data.dropoff.name}&dropoffLat=${data.dropoff.lat}&dropoffLng=${data.dropoff.lng}`
    );
  }

  return (
    <div className="w-full bg-white rounded-xl">
      <div className="flex">
        <button
          type="button"
          className="w-[50%] text-center py-3 rounded-tl-xl"
        >
          Point-to-point
        </button>
        <button
          type="button"
          className="w-[50%] text-center py-3 rounded-tr-xl bg-primary-100 text-black"
        >
          Hourly
        </button>
      </div>
      <form
        className="flex flex-col gap-4 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SearchLocations
          register={register}
          setValue={setValue}
          watch={watch}
          name="pickup"
        />
        <SearchLocations
          label="Drop off location"
          register={register}
          setValue={setValue}
          watch={watch}
          name="dropoff"
        />
        <div className="flex flex-col xl:flex-row xl:items-center gap-4">
          <SelectDate
            label="Pick up Date"
            placeholder="Select date"
            name="pickupDate"
            register={register}
            setValue={setValue}
          />
          <SelectTime
            label="Pick up time"
            placeholder="Select time"
            name="pickupTime"
            register={register}
            setValue={setValue}
          />
        </div>

        <PrimaryButton type="submit">Search</PrimaryButton>
      </form>
    </div>
  );
}

const FormItem = forwardRef(function FormItem(
  { icon, label, placeholder },
  ref
) {
  return (
    <div className="w-[100%] flex items-center gap-3 bg-primary-100 p-3 rounded-md duration-300 cursor-pointer hover:bg-primary-200">
      <span className="text-primary-600">{icon}</span>
      <div className="flex flex-col w-full gap">
        <label className="text-[12px] uppercase font-light">{label}</label>
        <input
          ref={ref}
          className="outline-0 w-full text-[16px] placeholder:text-primary-400"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
});
