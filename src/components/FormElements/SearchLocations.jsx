import { useRef, useState } from 'react';
import { HiMapPin } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetLocations } from '../../hooks/useGetLocations';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useGetLatLng } from '../../hooks/useGetLatLng';
import { RiFlightTakeoffFill, RiMapPin2Line, RiHotelLine } from 'react-icons/ri';
import LoadingLocation from '../LoadingLocation';

export default function SearchLocations({
  label = 'Pick-up location',
  placeholder = 'Airport, hotel, residence...',
  name,
  register,
  setValue,
  defaultValue,
}) {
  const [query, setQuery] = useState(defaultValue ?? '');
  const [show, setShow] = useState(false);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const { getCoordinates, isLoadingCoordinates } = useGetLatLng();
  const { locations, isLoadingLocations, isErrorLocations } = useGetLocations(query);

  useOutsideClick(wrapperRef, () => setShow(false));

  return (
    <div className="w-full cursor-pointer" ref={wrapperRef}>
      <input type="hidden" {...register(name)} />

      <div
        className={`
          flex items-center gap-3 rounded-xl border bg-white px-4 py-2.5
          transition-all duration-300
          ${show ? 'border-gray-700 shadow-sm' : 'border-gray-300 hover:border-gray-500'}
        `}
        onClick={() => {
          setShow(true);
          inputRef.current.focus();
        }}
      >
        <span className={`text-[18px] ${show ? 'text-gray-800' : 'text-gray-500'} ${query ? 'text-gray-800' : ''}`}>
          <HiMapPin />
        </span>

        <div className="flex flex-col w-full">
          <label
            className={`w-fit text-[11.5px] uppercase tracking-wide font-light 
              ${show ? 'text-gray-800' : 'text-gray-500'}`}
          >
            {label}
          </label>

          <input
            ref={inputRef}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShow(true);
            }}
            className="bg-transparent border-0 focus:outline-none text-[15px] font-normal text-gray-900 placeholder:text-gray-400 placeholder:font-extralight cursor-pointer"
          />
        </div>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="relative"
          >
            <div className="absolute top-2 w-full z-50 bg-white rounded-xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.12)] max-h-[260px] overflow-auto">
              {isErrorLocations && (
                <p className="py-3 px-4 text-[15px] font-light text-red-600">Error fetching locations.</p>
              )}

              {query.length < 3 && (
                <p className="py-3 px-4 text-[14px] text-gray-500">Enter at least 3 characters to search.</p>
              )}

              {isLoadingLocations && query.length >= 3 && (
                <div className="py-2">
                  <LoadingLocation />
                  <LoadingLocation />
                  <LoadingLocation />
                </div>
              )}

              {locations?.map((loc, i) => (
                <div
                  key={loc.id}
                  onClick={async () => {
                    setShow(false);
                    setQuery(loc.name);
                    const { lat, lng } = await getCoordinates({ query: loc?.name, id: loc?.id });
                    const data = {
                      ...loc,
                      lat,
                      lng,
                    };
                    setValue(name, data);
                  }}
                  className="grid grid-cols-[auto_1fr] items-center gap-4 px-4 py-2.5 cursor-pointer transition-all hover:bg-gray-100"
                >
                  <div className="flex items-center justify-center bg-gray-200 w-8 h-8 rounded-md">
                    {loc?.type === 'airport' && <RiFlightTakeoffFill />}
                    {loc?.type === 'location' && <RiMapPin2Line />}
                    {loc?.type === 'hotel' && <RiHotelLine />}
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-900">{loc.name}</p>
                    {loc.address && <p className="text-[12px] text-gray-400">{loc.address}</p>}
                  </div>
                </div>
              ))}

              {!isLoadingLocations && query.length >= 3 && locations?.length === 0 && (
                <p className="py-3 px-4 text-[14px] text-gray-500">No results found.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
