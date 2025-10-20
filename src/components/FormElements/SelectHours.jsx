import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegClock } from 'react-icons/fa6';

export default function SelectHours({
  label = 'Number of hours',
  placeholder = 'Select hours',
  name,
  register,
  setValue,
}) {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');

  useOutsideClick(wrapperRef, () => setShowOptions(false));

  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12 hours

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input type="hidden" {...register(name)} />

      {/* Input field */}
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={`flex items-center gap-3 bg-white border border-primary-200 rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 
          ${
            showOptions
              ? 'ring-2 ring-accent-500/40 border-accent-500/50'
              : 'hover:border-accent-500/50'
          }`}
      >
        <span className="text-black text-[18px]">
          <FaRegClock />
        </span>
        <div className="flex flex-col w-full">
          <label className="text-[12px] uppercase text-primary-400 font-light tracking-wider cursor-pointer">
            {label}
          </label>
          <input
            ref={inputRef}
            readOnly
            placeholder={placeholder}
            value={
              selectedHour
                ? `${selectedHour} hour${selectedHour > 1 ? 's' : ''}`
                : ''
            }
            className="bg-transparent border-0 outline-none w-full text-[15.5px] font-light text-primary-900 placeholder:text-primary-300 cursor-pointer"
          />
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 top-[calc(100%+6px)] z-[100]"
          >
            <div className="bg-white border border-primary-100 shadow-[0_6px_24px_rgba(0,0,0,0.08)] rounded-xl w-auto min-w-[200px] overflow-hidden">
              {hours.map((hour) => (
                <p
                  key={hour}
                  onClick={() => {
                    setSelectedHour(hour);
                    setValue(name, hour);
                    setShowOptions(false);
                  }}
                  className={`py-2 px-4 text-[15px] font-light text-primary-800 cursor-pointer transition-colors duration-200 hover:bg-primary-50 ${
                    selectedHour === hour
                      ? 'bg-accent-500/10 text-accent-600'
                      : ''
                  }`}
                >
                  {hour} {hour > 1 ? 'hours' : 'hour'}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
