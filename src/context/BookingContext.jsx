import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetZoneByAddress } from '../hooks/useGetZoneByAddress';
import { useGetDistance } from '../hooks/useGetDistance';
import { CurrencyContext } from './CurrencyContext';
import { useCreateBooking } from '../hooks/useCreateBooking';
import toast from 'react-hot-toast';

export const BookingContext = createContext();

export default function BookingProvider({ children }) {
  const navigate = useNavigate();
  const { getZoneByAddress } = useGetZoneByAddress();
  const { getDistance } = useGetDistance();
  const { createBooking, isCreating } = useCreateBooking();
  const { currency } = useContext(CurrencyContext);
  const { pathname } = useLocation();

  const initialBookingData = {
    tripType: 'distance',
    bookingRef: '',
    pickup: {
      id: '',
      zone: '',
      name: '',
      address: '',
      lat: '',
      lng: '',
      type: '',
    },
    dropoff: {
      id: '',
      zone: '',
      name: '',
      address: '',
      lat: '',
      lng: '',
      type: '',
    },
    pickupDate: '2025-11-09',
    pickupTime: '04:00 PM',
    vehicle: '',
    hoursBooked: 3,
    bookingDetails: {
      firstName: 'Ammar',
      lastName: 'Afridi',
      email: '',
      phoneNumber: '',
      flightNumber: '',
      arrivalTime: '',
      message: '',
      payment: {
        method: 'stripe',
        status: 'UNPAID',
        amount: 0,
        currency: currency?.code?.toLowerCase(),
        transactionId: '',
      },
    },
    orderSummary: {
      baseFare: 0,
      distanceCharge: 0,
      hourlyCharge: 0,
      addOns: 0,
      taxes: 0,
      total: 0,
      currency: currency?.code,
      conversionRate: currency?.conversionRate,
    },
  };

  const [bookingData, setBookingData] = useState(initialBookingData);
  const [pageTitle, setPageTitle] = useState('');
  const [btn, setBtn] = useState({
    text: '',
    disabled: false,
  });

  function validateLimoForm(data) {
    if (!data?.pickup?.name) return 'Please select your pickup location.';
    if (bookingData?.tripType === 'distance' && !data?.dropoff?.name)
      return 'Please select your drop-off location.';
    if (bookingData?.tripType === 'hourly' && !data?.hoursBooked)
      return 'Please select how many hours you’d like to book.';
    if (!data?.pickupDate) return 'Please select a pickup date.';
    if (!data?.pickupTime) return 'Please select a pickup time.';
    return null;
  }

  function validateBookingForm(data) {
    if (!data?.bookingDetails?.firstName)
      return "Please enter the passenger's first name.";
    if (!data?.bookingDetails?.lastName)
      return "Please enter the passenger's last name.";
    if (!data?.bookingDetails?.email)
      return "Please enter the passenger's email address.";
    if (!data?.bookingDetails?.phoneNumber)
      return "Please enter the passenger's phone number.";
    if (!data?.bookingDetails?.payment?.method)
      return 'Please select a payment method to proceed.';
    return null;
  }

  async function submitLimoForm(data) {
    const error = validateLimoForm(data);
    if (error) return toast.error(error);

    try {
      const pickupZone = await getZoneByAddress({
        lat: data.pickup.lat,
        lng: data.pickup.lng,
      });

      let dropoffZone = null;

      if (
        bookingData?.tripType === 'distance' &&
        data.dropoff?.lat &&
        data.dropoff?.lng
      ) {
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
        hoursBooked:
          bookingData?.tripType === 'hourly' ? data?.hoursBooked : null,
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

  async function handleNext() {
    if (location.pathname === '/book/select-limo') {
      if (!bookingData?.vehicle) {
        toast.error('Please select a vehicle to proceed.');
        return;
      }
      navigate('/book/booking-details');
      return;
    }

    if (location.pathname === '/book/booking-details') {
      const error = validateBookingForm(bookingData);
      if (error) {
        toast.error(error);
        return;
      }

      createBooking(bookingData);
    }
  }

  function handleChange(field, value) {
    setBookingData((prev) => ({
      ...prev,
      bookingDetails: {
        ...prev.bookingDetails,
        [field]: value,
      },
    }));
  }

  function handleSelectVehicle(vehicle) {
    setBookingData((prev) => ({
      ...prev,
      vehicle: vehicle?.id,
      orderSummary: {
        ...prev.orderSummary,
        baseFare: currency?.conversionRate * vehicle?.totalPrice,
        currency: currency?.code?.toLowerCase(),
        conversionRate: currency?.conversionRate,
      },
    }));
  }

  function handleSelectPaymentMethod(method) {
    setBookingData((prev) => ({
      ...prev,
      bookingDetails: {
        ...prev.bookingDetails,
        payment: {
          ...prev.bookingDetails.payment,
          method,
        },
      },
    }));
  }

  // Change button text and state, and page title
  useEffect(() => {
    if (location.pathname === '/book/select-limo') {
      setPageTitle('Choose Your Limo');
      setBtn({
        text: 'Enter Contact Information',
        disabled: !bookingData?.vehicle,
      });
    }

    if (location.pathname === '/book/booking-details') {
      setPageTitle('Booking Details');
      setBtn({
        text: 'Proceed to Payment',
        disabled: false,
      });
    }
  }, [location.pathname, bookingData]);

  // Update the total whenever a value changes in orderSummary
  useEffect(() => {
    setBookingData((prev) => {
      const { baseFare = 0, addOns = 0, taxes = 0 } = prev.orderSummary;
      const total =
        parseFloat(baseFare) + parseFloat(addOns) + parseFloat(taxes);

      return {
        ...prev,
        orderSummary: {
          ...prev.orderSummary,
          total,
        },
      };
    });
  }, [
    bookingData.orderSummary.baseFare,
    bookingData.orderSummary.addOns,
    bookingData.orderSummary.taxes,
  ]);

  // Update currency whenever changed
  useEffect(() => {
    setBookingData((prev) => {
      if (!prev?.orderSummary?.baseFare) return prev;
      const oldRate = prev.orderSummary.conversionRate || 1;

      return {
        ...prev,
        orderSummary: {
          ...prev.orderSummary,
          baseFare:
            (prev.orderSummary.baseFare / oldRate) * currency.conversionRate, // 👈 numeric only
          currency: currency?.code?.toLowerCase(),
          conversionRate: currency.conversionRate,
        },
      };
    });
  }, [currency]);

  // Check if any important data is missing
  useEffect(() => {
    const { tripType, pickup, dropoff, pickupDate, pickupTime, hoursBooked } =
      bookingData;

    if (
      pathname.startsWith('/book/select-limo') ||
      pathname.startsWith('/book/booking-details')
    ) {
      if (
        tripType === 'distance' &&
        (!pickup?.name || !dropoff?.name || !pickupDate || !pickupTime)
      )
        navigate('/');
      if (
        tripType === 'hourly' &&
        (!pickup?.name || !hoursBooked || !pickupDate || !pickupTime)
      )
        navigate('/');
    }

    if (pathname.startsWith('/book/booking-details') && !bookingData.vehicle)
      navigate('/book/select-limo');
  }, [pathname, bookingData, navigate]);

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        pageTitle,
        btn,
        validateLimoForm,
        validateBookingForm,
        handleChange,
        handleSelectVehicle,
        handleSelectPaymentMethod,
        submitLimoForm,
        handleNext,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
