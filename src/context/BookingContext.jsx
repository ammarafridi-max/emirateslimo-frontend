import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetZoneByAddress } from '../hooks/useGetZoneByAddress';
import { useGetDistance } from '../hooks/useGetDistance';
import { CurrencyContext } from './CurrencyContext';
import toast from 'react-hot-toast';

export const BookingContext = createContext();

export default function BookingProvider({ children }) {
  const navigate = useNavigate();
  const [isLoadingLimoForm, setIsLoadingLimoForm] = useState(false);
  const { getZoneByAddress } = useGetZoneByAddress();
  const { getDistance } = useGetDistance();
  const { currency } = useContext(CurrencyContext);

  const initialBookingData = {
    tripType: '',
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
    pickupDate: '',
    pickupTime: '',
    vehicle: '',
    hoursBooked: 1,
    bookingDetails: {
      firstName: '',
      lastName: '',
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

  const [bookingData, setBookingData] = useState(
    JSON.parse(localStorage.getItem('bookingData')) || initialBookingData
  );

  async function submitLimoForm(data) {
    try {
      setIsLoadingLimoForm(true);

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

      if (!pickupZone) {
        toast.error('Pickup location not covered.');
        return;
      }

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
          zone: pickupZone?._id || null,
        },
        dropoff:
          {
            ...data.dropoff,
            zone: dropoffZone?._id || null,
          } || null,
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
        hoursBooked:
          bookingData?.tripType === 'hourly' ? data?.hoursBooked : null,
        distance: distance?.distanceKm,
        tripDuration: distance?.durationMin,
      }));

      navigate('/book/select-limo');

      localStorage.removeItem('bookingData');
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error('Something went wrong fetching zones.');
    } finally {
      setIsLoadingLimoForm(false);
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

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        isLoadingLimoForm,
        handleChange,
        handleSelectVehicle,
        handleSelectPaymentMethod,
        submitLimoForm,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
