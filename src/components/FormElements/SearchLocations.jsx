import { useRef, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { useGetLocations } from '../../hooks/useGetLocations';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingLocation from '../LoadingLocation';

export default function SearchLocations({
  label = 'Pick up location',
  placeholder = 'Airport, hotel, residence...',
  name,
  register,
  setValue,
  defaultValue,
}) {
  const [query, setQuery] = useState(defaultValue ?? '');
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const { locations, isLoadingLocations, isErrorLocations } =
    useGetLocations(query);

  useOutsideClick(wrapperRef, () => setShowOptions(false));

  return (
    <div className="w-full" ref={wrapperRef}>
      <input type="hidden" {...register(name)} />

      {/* Input Field */}
      <div
        onClick={() => {
          if (query.length) setQuery('');
          setShowOptions(true);
          inputRef.current.focus();
        }}
        className={`flex items-center gap-3 bg-primary-100 border border-primary-100 rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 
          ${showOptions ? 'ring ring-primary-900' : 'hover:ring hover:ring-primary-300'}`}
      >
        <span
          className={`text-[18px] ${showOptions ? 'text-primary-900' : 'text-primary-500'}`}
        >
          <FaLocationDot />
        </span>
        <div className="flex flex-col w-full">
          <label
            className={`text-[11.5px] uppercase font-light tracking-wider cursor-pointer ${showOptions ? 'text-primary-900' : 'text-primary-500'}`}
          >
            {label}
          </label>
          <input
            ref={inputRef}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowOptions(true);
            }}
            className="bg-transparent border-0 outline-none w-full text-[15.5px] font-light text-primary-900 placeholder:text-primary-300 cursor-pointer"
          />
        </div>
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            <div className="absolute top-2 bg-white border border-primary-300 shadow-[0_6px_24px_rgba(0,0,0,0.08)] rounded-lg w-full z-50 max-h-[270px] overflow-auto">
              {/* Error */}
              {isErrorLocations && (
                <p className="py-3 px-4 text-[15px] font-extralight text-primary-600">
                  Error fetching locations.
                </p>
              )}

              {/* Instruction */}
              {query.length < 3 && (
                <p className="py-3 px-4 text-[14.5px] text-primary-500 font-extralight">
                  Enter at least 3 characters to search.
                </p>
              )}

              {/* Loading */}
              {isLoadingLocations && query.length >= 3 && (
                <div className="py-2">
                  <LoadingLocation />
                  <LoadingLocation />
                  <LoadingLocation />
                </div>
              )}

              {/* Locations */}
              {locations?.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => {
                    setQuery(loc.name);
                    setValue(name, loc);
                    setShowOptions(false);
                  }}
                  className="py-2 px-4 border-b border-primary-200 hover:bg-primary-100 cursor-pointer transition-colors duration-200"
                >
                  <p className="text-[14px] text-primary-900 font-normal">
                    {loc.name}
                  </p>
                  {loc.address && (
                    <p className="text-[12px] text-primary-500 font-extralight">
                      {loc.address}
                    </p>
                  )}
                </div>
              ))}

              {/* Empty Results */}
              {!isLoadingLocations &&
                query.length >= 3 &&
                locations?.length === 0 && (
                  <p className="py-3 px-4 text-[14.5px] text-primary-500 font-extralight">
                    No results found.
                  </p>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
