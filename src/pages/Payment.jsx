import { useSearchParams } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import { Helmet } from 'react-helmet-async';
import { FaCheck, FaX } from 'react-icons/fa6';
import { format } from 'date-fns';
import PrimarySection from '../components/PrimarySection';
import Container from '../components/Container';
import Loading from '../components/Loading';
import PageHeading from '../components/PageHeading';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { booking, isLoadingBooking } = useBooking(id);

  if (isLoadingBooking) return <Loading />;

  if (!booking) return <Failure />;

  const paymentStatus = booking?.bookingDetails?.payment?.status?.toUpperCase();

  return (
    <PrimarySection className="py-10 lg:py-15">
      <Container>
        {paymentStatus === 'PAID' ? <Success booking={booking} /> : <Failure />}
        {/* <Success booking={booking} /> */}
      </Container>
    </PrimarySection>
  );
}

// ✅ SUCCESS COMPONENT
function Success({ booking }) {
  const {
    tripType,
    hoursBooked,
    bookingRef,
    pickup,
    dropoff,
    pickupDate,
    pickupTime,
    vehicle,
    orderSummary,
    bookingDetails,
  } = booking;
  const customerName = `${bookingDetails?.firstName}`;

  return (
    <>
      <Helmet>
        <title>Payment Successfully Processed</title>
      </Helmet>
      <div className="flex items-center justify-center bg-green-700 w-20 h-20 lg:w-25 lg:h-25 rounded-full mx-auto mb-5">
        <FaCheck size={40} className="text-white" />
      </div>
      <PageHeading className="text-2xl lg:text-4xl text-center">Payment Successfully Processed</PageHeading>
      <p className="text-center text-md lg:text-lg mt-4 font-extralight">
        Thank you for your booking {customerName}. Your limo has been reserved on{' '}
        {format(new Date(pickupDate), 'dd LLLL yyyy')} at {pickupTime}. Your driver will be assigned a day before your
        trip and their contact details will be shared with you via email.
      </p>

      <div className="bg-primary-100 shadow-md rounded-xl p-6 mt-6 text-gray-700">
        <div>
          <h2 className="text-2xl lg:text-[27px] font-medium">
            Booking Reference: <span className="">{bookingRef}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 lg:divide-x divide-primary-300">
          <div className="mt-5">
            <h3 className="text-lg lg:text-xl mb-4 font-medium">Trip Details</h3>
            <p className="font-normal mb-2">
              Trip Type:{' '}
              <span className="font-extralight">{tripType === 'distance' ? 'Point-to-Point' : 'Hourly'}</span>
            </p>
            <p className="font-normal mb-2">
              Pickup Address:{' '}
              <span className="font-extralight">
                {pickup?.name} - {pickup?.address}
              </span>
            </p>
            {tripType === 'distance' ? (
              <p className="font-normal mb-2">
                Dropoff Address:{' '}
                <span className="font-extralight">
                  {dropoff?.name} - {dropoff?.address}
                </span>
              </p>
            ) : (
              <p className="font-normal mb-2">
                Hours Booked: <span className="font-extralight">{hoursBooked}</span>
              </p>
            )}

            <p className="font-normal mb-2">
              Date and Time:{' '}
              <span className="font-extralight">
                {format(new Date(pickupDate), 'dd LLLL yyyy')} at {pickupTime}
              </span>
            </p>
            <p className="font-normal mb-2">
              Limo:{' '}
              <span className="font-extralight">
                {vehicle?.brand} {vehicle?.model}
              </span>
            </p>
          </div>

          <div className="mt-5">
            <h3 className="text-lg lg:text-xl mb-4 font-medium">Passenger Details</h3>
            <p className="font-normal mb-2">
              Name: <span className="font-extralight">{customerName}</span>
            </p>
            <p className="font-normal mb-2">
              Email Address: <span className="font-extralight">{bookingDetails?.email}</span>
            </p>
            <p className="font-normal mb-2">
              Phone Number: <span className="font-extralight">{bookingDetails?.phoneNumber}</span>
            </p>
          </div>
        </div>

        <div className="border-t mt-5 pt-4">
          <h3 className="font-semibold text-gray-800 mb-1">Payment Summary</h3>
          <p>
            <strong>Amount Paid:</strong> {orderSummary?.currency?.toUpperCase()} {orderSummary?.total}
          </p>
          <p>
            <strong>Transaction ID:</strong> {bookingDetails?.payment?.transactionId}
          </p>
        </div>
      </div>
    </>
  );
}

// ❌ FAILURE COMPONENT
function Failure() {
  return (
    <>
      <Helmet>
        <title>Payment Not Found</title>
      </Helmet>
      <div className="flex items-center justify-center bg-red-700 w-20 h-20 lg:w-25 lg:h-25 rounded-full mx-auto mb-5">
        <FaX size={40} className="text-white" />
      </div>
      <PageHeading className="text-2xl lg:text-4xl text-center">Payment Not Found</PageHeading>
      {/* <p className="text-center text-md lg:text-lg mt-4 font-extralight">
        Thank you for your booking {customerName}. Your limo has been reserved
        on {format(new Date(pickupDate), 'dd LLLL yyyy')} at {pickupTime}. Your
        driver will be assigned a day before your trip and their contact details
        will be shared with you via email.
      </p> */}
    </>
  );
}
