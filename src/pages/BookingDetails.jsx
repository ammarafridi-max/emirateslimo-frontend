import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import { FaApplePay, FaCcPaypal, FaStripe } from 'react-icons/fa6';
import SectionTitle from '../components/SectionTitle';
import Input from '../components/FormElements/Input';

const paymentMethods = [
  {
    name: 'Stripe',
    id: 'stripe',
    icon: <FaStripe />,
    text: 'Pay Securely with Stripe',
    color: '#5433ff',
  },
  // {
  //   name: 'Paypal',
  //   id: 'paypal',
  //   icon: <FaCcPaypal />,
  //   text: 'Pay Now with PayPal',
  //   color: '#009cde',
  // },
  // {
  //   name: 'Apple Pay',
  //   id: 'applePay',
  //   icon: <FaApplePay />,
  //   text: 'Instant Payment With Apple Pay',
  //   color: '#000',
  // },
];

export default function BookingDetails() {
  const { bookingData, handleChange, handleSelectPaymentMethod } =
    useContext(BookingContext);

  return (
    <div className="flex flex-col gap-8 md:gap-12 w-full p-5 md:p-7 bg-white rounded-xl shadow-xl shadow-gray-300">
      <PassengerInformation onChange={handleChange} bookingData={bookingData} />
      <PaymentOptions
        selected={bookingData.bookingDetails.payment.method}
        onSelect={handleSelectPaymentMethod}
      />
    </div>
  );
}

function PassengerInformation({ onChange, bookingData }) {
  return (
    <div>
      <SectionTitle className="md:mb-0">Passenger Information</SectionTitle>
      <p className="font-extralight text-[14px] text-primary-500 leading-6 pt-5">
        Please fill in your contact details for a seamless pickup and drop-off
        experience.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mt-3">
        <Input
          label="First Name"
          defaultValue={bookingData.bookingDetails.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
        />
        <Input
          label="Last Name"
          defaultValue={bookingData.bookingDetails.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
        <Input
          label="Email Address"
          defaultValue={bookingData.bookingDetails.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
        <Input
          label="Phone Number"
          defaultValue={bookingData.bookingDetails.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
        />
      </div>

      {bookingData?.pickup?.type === 'airport' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
          <Input
            label="Flight Number"
            optional
            placeholder="eg. AC057"
            defaultValue={bookingData.bookingDetails.flightNumber}
            onChange={(e) => onChange('flightNumber', e.target.value)}
          />
          <Input
            label="Expected Arrival Time"
            optional
            defaultValue={bookingData.bookingDetails.arrivalTime}
            onChange={(e) => onChange('arrivalTime', e.target.value)}
          />
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
          className="w-full bg-transparent text-[14px] font-light px-4 py-2 rounded-md border border-gray-300 focus:border-primary-900 outline-0"
          defaultValue={bookingData.bookingDetails.message}
          onChange={(e) => onChange('message', e.target.value)}
        />
      </div>
    </div>
  );
}

function PaymentOptions({ selected, onSelect }) {
  return (
    <div>
      <SectionTitle className="md:mb-0">Payment</SectionTitle>
      <p className="font-extralight text-[14px] text-primary-500 leading-6 pt-5">
        Select your preferred payment method. Your details are processed
        securely by our trusted partners. We do not store any credit/debit card
        details.
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
            onClick={() => onSelect(method.id)} // ✅ simpler, direct handler
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
