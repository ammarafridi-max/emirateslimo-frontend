import { useContext, useEffect, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { FaApplePay, FaCcPaypal, FaStripe } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import SectionTitle from '../components/SectionTitle';

const paymentMethods = [
  {
    name: 'Stripe',
    id: 'stripe',
    icon: <FaStripe />,
    text: 'Pay Securely with Stripe',
    color: '#5433ff',
  },
  {
    name: 'Paypal',
    id: 'paypal',
    icon: <FaCcPaypal />,
    text: 'Pay Now with PayPal',
    color: '#009cde',
  },
  {
    name: 'Apple Pay',
    id: 'applePay',
    icon: <FaApplePay />,
    text: 'Instant Payment With Apple Pay',
    color: '#000',
  },
];

export default function BookingDetails() {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const { register, watch, setValue } = useForm({
    defaultValues: bookingData.bookingDetails,
  });

  const watchedValues = watch();

  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      bookingDetails: {
        ...prev.bookingDetails,
        ...watchedValues,
      },
    }));
  }, [watchedValues, setBookingData]);

  return (
    <div className="flex flex-col gap-8 md:gap-12 w-full p-5 md:p-7 bg-white rounded-lg shadow-md">
      <PassengerInformation register={register} bookingData={bookingData} />
      <PaymentOptions
        setValue={setValue}
        selected={watchedValues.paymentMethod}
      />
    </div>
  );
}

function PassengerInformation({ register, bookingData }) {
  return (
    <div>
      <SectionTitle className="md:mb-0">Passenger Information</SectionTitle>
      <p className="font-extralight text-[14px] text-primary-500 leading-5">
        Please fill in your contact details for a seamless pickup and drop-off
        experience.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <label className="font-light text-[14px]">First Name</label>
          <input
            className="w-full bg-primary-100 text-[14px] font-light px-3 md:px-4 py-2 rounded-md shadow-sm shadow-primary-300 outline-0"
            {...register('firstName')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-light text-[14px]">Last Name</label>
          <input
            className="w-full bg-primary-100 text-[14px] font-light px-3 md:px-4 py-2 rounded-md shadow-sm shadow-primary-300 outline-0"
            {...register('lastName')}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <label className="font-light text-[14px]">Email Address</label>
          <input
            className="w-full bg-primary-100 text-[14px] font-light px-3 md:px-4 py-2 rounded-md shadow-sm shadow-primary-300 outline-0"
            {...register('email')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-light text-[14px]">Phone Number</label>
          <input
            className="w-full bg-primary-100 text-[14px] font-light px-3 md:px-4 py-2 rounded-md shadow-sm shadow-primary-300 outline-0"
            {...register('phoneNumber')}
          />
        </div>
      </div>
      {bookingData?.pickup?.type === 'airport' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label className="font-light text-[14px]">
              Flight Number <span className="text-primary-300">(optional)</span>
            </label>
            <input
              placeholder="eg. AC057"
              className="w-full bg-primary-100 text-[14px] font-light px-3 md:px-4 py-2 rounded-md shadow-sm shadow-primary-300 outline-0"
              {...register('flightNumber')}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-light text-[14px]">
              Expected Arrival Time
            </label>
            <input
              className="w-full bg-primary-100 text-[14px] font-light px-3 md:px-4 py-2 rounded-md shadow-sm shadow-primary-300 outline-0"
              {...register('arrivalTime')}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 mt-3">
        <label className="font-light text-[14px]">
          Special Requests / Notes{' '}
          <span className="text-primary-300">(optional)</span>
        </label>
        <textarea
          rows={5}
          placeholder="e.g., “Need a baby seat”"
          className="w-full bg-primary-100 text-[14px] font-light px-4 py-2 rounded-md shadow-sm shadow-primary-300 outline-0"
          {...register('message')}
        />
      </div>
    </div>
  );
}

function PaymentOptions({ setValue, selected }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-medium">Payment Method</h2>
      <p className="font-extralight text-[14px] text-primary-500 mt-2 leading-5">
        Select your preferred payment method. Your details are processed
        securely by our trusted partners.
      </p>
      <div className="flex flex-col gap-2 mt-4">
        {paymentMethods.map((method) => (
          <SelectPaymentButton
            key={method.id}
            id={method.id}
            icon={method.icon}
            text={method.text}
            color={method.color}
            isSelected={selected === method.id}
            onClick={() => setValue('paymentMethod', method.id)} // ✅ Update form value
          />
        ))}
      </div>
    </div>
  );
}
function SelectPaymentButton({
  onClick,
  isSelected,
  icon,
  text,
  color = '#000',
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full flex items-center justify-between rounded-xl border-2 transition-all duration-300 p-4 shadow-sm cursor-pointer ${
        isSelected
          ? 'border-accent-500 bg-primary-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-primary-200 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* <span
          className={`text-sm ${
            isSelected ? 'text-primary-600' : 'text-gray-300'
          }`}
        >
          {isSelected ? <FaDotCircle /> : <FaCircle />}
        </span> */}

        <div className="flex items-center gap-3">
          <span
            className="text-2xl"
            style={isSelected ? { color } : {}} // ✅ dynamic color applied safely via inline style
          >
            {icon}
          </span>
          <span
            className={`text-[14px] font-light ${
              isSelected ? 'text-primary-700' : 'text-gray-700'
            }`}
          >
            {text}
          </span>
        </div>
      </div>

      {isSelected && (
        <span className="text-[12px] text-primary-600 font-medium">
          Selected
        </span>
      )}
    </button>
  );
}
