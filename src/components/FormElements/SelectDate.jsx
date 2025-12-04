import { useRef, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { format } from 'date-fns';
import Calendar from '../Calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCalendarDays } from 'react-icons/hi2';

export default function SelectDate({
  register,
  label = 'Pickup date',
  placeholder = 'Select a date',
  setValue,
  name,
  defaultValue,
}) {
  const wrapperRef = useRef(null);
  const [date, setDate] = useState(defaultValue || '');
  const [showCalendar, setShowCalendar] = useState(false);

  useOutsideClick(wrapperRef, () => setShowCalendar(false));

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input type="hidden" {...register(name)} />

      {/* Input Field */}
      <div
        onClick={() => setShowCalendar(true)}
        className={`flex items-center gap-3 bg-white border rounded-xl px-4 py-2.5 cursor-pointer transition-all duration-300 
          ${showCalendar ? 'border-gray-900 shadow-sm' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <span
          className={`text-[18px] ${showCalendar ? 'text-gray-800' : 'text-gray-500'} ${date ? 'text-gray-800' : ''}`}
        >
          <HiCalendarDays />
        </span>

        <div className="flex flex-col w-full">
          <label
            className={`w-fit text-[11px] uppercase tracking-wide font-light cursor-pointer
              ${showCalendar ? 'text-gray-800' : 'text-gray-500'}`}
          >
            {label}
          </label>
          <input
            readOnly
            className="bg-transparent border-0 outline-none w-full text-[15.5px] font-light text-primary-900 placeholder:text-primary-300 cursor-pointer"
            placeholder={placeholder}
            value={date ? format(new Date(date), 'dd LLLL yyyy') : ''}
          />
        </div>
      </div>

      {/* Calendar Dropdown */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 top-[calc(100%+6px)] z-[1000]"
          >
            <Calendar
              onDateClick={(selectedDate) => {
                setDate(selectedDate);
                setValue(name, selectedDate);
                setShowCalendar(false);
              }}
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
