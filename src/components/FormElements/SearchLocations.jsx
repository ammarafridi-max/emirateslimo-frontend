import { useRef, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { useGetLocations } from '../../hooks/useGetLocations';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import LoadingLocation from '../LoadingLocation';

export default function SearchLocations({
  label = 'Pick up location',
  placeholder = 'Airport, hotel, residence...',
  name,
  register,
  setValue,
  watch,
}) {
  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const { locations, isLoadingLocations, isErrorLocations } =
    useGetLocations(query);

  useOutsideClick(wrapperRef, () => setShowOptions(false));

  return (
    <div className="w-[100%]" ref={wrapperRef}>
      <input type="hidden" {...register(name)} />

      <div
        onClick={() => {
          if (query.length) {
            setQuery('');
          }
          setShowOptions(true);
          inputRef.current.focus();
        }}
        className="flex items-center gap-3 bg-primary-100 p-3 rounded-md duration-300 cursor-pointer hover:bg-primary-200"
      >
        <span className="text-primary-600">
          <FaLocationDot />
        </span>
        <div className="flex flex-col w-full">
          <label className="text-[12px] text-gray-500 uppercase font-light cursor-pointer">
            {label}
          </label>
          <input
            ref={inputRef}
            className="outline-0 w-full text-[16px] placeholder:text-primary-400 cursor-pointer"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowOptions(true);
            }}
          />
        </div>
      </div>

      {showOptions && (
        <div className="relative">
          <div className="absolute top-3 bg-white border border-gray-300 h-fit max-h-[250px] w-full z-50 rounded-md overflow-scroll">
            {isErrorLocations && (
              <p className="py-3 px-4 font-extralight text-[15px]">
                Error getting locations
              </p>
            )}
            {query.length < 3 && (
              <p className="py-3 px-4 font-extralight text-[15px]">
                Enter 3 or more characters
              </p>
            )}
            {isLoadingLocations && query.length >= 3 && (
              <div className="py-2">
                <LoadingLocation />
                <LoadingLocation />
                <LoadingLocation />
              </div>
            )}
            {locations?.map((loc) => (
              <>
                <p
                  key={loc.id}
                  className="flex flex-col py-2 px-4 font-extralight text-[15px] cursor-pointer hover:bg-primary-100 leading-5"
                  onClick={() => {
                    setQuery(loc.name); // show name in input
                    setValue(name, loc); // store full object in RHF
                    setShowOptions(false); // close dropdown
                  }}
                >
                  <span className="font-normal">{loc.name}</span>
                  <span className="font-extralight text-[13px]">
                    {loc.address}
                  </span>
                </p>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
