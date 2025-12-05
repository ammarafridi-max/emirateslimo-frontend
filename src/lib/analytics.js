import ReactGA from 'react-ga4';

export function initializeGA() {
  if (import.meta.env.MODE !== 'production') return;
  ReactGA.initialize(import.meta.env.VITE_GA4_MEASUREMENT_ID);
}

export const trackPageView = (path = window.location.pathname) => {
  if (import.meta.env.MODE !== 'production') return;
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackLimoFormSubmission = ({ tripType, pickup, dropoff, pickupDate, pickupTime, hoursBooked }) => {
  if (import.meta.env.MODE !== 'production') return;
  ReactGA.event('limo_form_submission', {
    tripType,
    pickup,
    dropoff: dropoff || null,
    pickupDate,
    pickupTime: pickupTime || null,
    hoursBooked: hoursBooked || null,
  });
};

export const trackVehicleSelection = ({ id, brand, model }) => {
  if (import.meta.env.MODE !== 'production') return;
  ReactGA.event('vehicle_selected', {
    id,
    brand,
    model,
  });
};

export const trackBookingDetailsEntered = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  flightNumber,
  arrivalTime,
  message,
}) => {
  if (import.meta.env.MODE !== 'production') return;
  ReactGA.event('booking_details_entered', {
    firstName,
    lastName,
    email,
    phoneNumber,
    flightNumber,
    arrivalTime,
    message,
  });
};

export const trackBeginCheckout = ({ currency, value, items }) => {
  if (import.meta.env.MODE !== 'production') return;
  ReactGA.event('begin_checkout', {
    currency,
    value,
    items,
  });
};

export const trackPurchaseEvent = ({
  currency,
  value,
  transactionId,
  items = [{ item_name: 'Chauffeur Service', price: 150, quantity: 1 }],
}) => {
  if (import.meta.env.MODE !== 'production') return;
  ReactGA.event('purchase', {
    transaction_id: transactionId,
    value,
    currency,
    items,
  });
};
