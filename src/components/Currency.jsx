import { useContext, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { CurrencyContext } from '../context/CurrencyContext';
import { useOutsideClick } from '../hooks/useOutsideClick';

export default function Currency() {
  const { currency, currencies, handleSetCurrency } = useContext(CurrencyContext);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowCurrencies(false));

  return (
    <>
      {showCurrencies && <div className="block lg:hidden fixed top-0 left-0 h-dvh w-dvw bg-primary-900/40 z-14"></div>}
      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          className="relative flex items-center justify-between text-[12px] gap-2 border border-primary-200 bg-white hover:bg-primary-100 rounded-sm px-3 py-1.5 cursor-pointer duration-300 z-15"
          onClick={() => setShowCurrencies((val) => !val)}
        >
          <span>{currency?.code}</span>
          <span className="hidden lg:block">
            <HiChevronDown />
          </span>
        </button>
        {showCurrencies && (
          <div className="min-w-35 grid grid-cols-2 h-fit absolute top-10 right-0 p-2 bg-white mx-auto rounded-sm shadow-[0px_0px_8px_rgba(0,0,0,0.2)] z-15">
            {currencies?.map((cur, i) => (
              <button
                key={cur.code}
                onClick={() => {
                  setShowCurrencies(false);
                  handleSetCurrency(cur?.code, cur?.sign, cur?.conversionRate);
                }}
                type="button"
                className="rounded-md text-center text-[12px] py-1.5 hover:bg-primary-100 duration-300 cursor-pointer"
              >
                {cur.code}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
