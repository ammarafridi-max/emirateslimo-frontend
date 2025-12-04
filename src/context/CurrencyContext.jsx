import { createContext, useState } from 'react';

// This context is used to display prices in different currencies
// This context is used in Currency.jsx, VehicleCard.jsx, BookingSummary.jsx

export const CurrencyContext = createContext();

export default function CurrencyProvider({ children }) {
  const currencies = [
    {
      code: 'AED',
      sign: 'AED',
      conversionRate: 1,
    },
    {
      code: 'USD',
      sign: '$',
      conversionRate: 0.27,
    },
    {
      code: 'EUR',
      sign: '€',
      conversionRate: 0.24,
    },
    {
      code: 'GBP',
      sign: '£',
      conversionRate: 0.21,
    },
  ];
  const [currency, setCurrency] = useState(
    JSON.parse(localStorage.getItem('currency')) || {
      code: currencies[0].code,
      sign: currencies[0].sign,
      conversionRate: currencies[0].conversionRate,
    },
  );

  function handleSetCurrency(code, sign, conversionRate) {
    const newCurrency = { code, sign, conversionRate };
    setCurrency(newCurrency);
    localStorage.setItem('currency', JSON.stringify(newCurrency));
  }

  return (
    <CurrencyContext.Provider value={{ currencies, currency, setCurrency, handleSetCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
