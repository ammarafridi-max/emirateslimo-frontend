import { useRef, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { format } from 'date-fns';
import Calendar from '../Calendar';
import { motion, AnimatePresence } from 'framer-motion';

export default function SelectDate({
  register,
  label = 'Pickup date',
  placeholder = 'Select a date',
  setValue,
  name,
}) {
  const wrapperRef = useRef(null);
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  useOutsideClick(wrapperRef, () => setShowCalendar(false));

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input type="hidden" {...register(name)} />

      {/* Input Field */}
      <div
        onClick={() => setShowCalendar(true)}
        className={`flex items-center gap-3 bg-primary-100 border border-primary-100 rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 
          ${showCalendar ? 'ring ring-primary-900' : 'hover:ring hover:ring-primary-300'}`}
      >
        <span className="text-primary-900 text-[18px]">
          <FaCalendarDays />
        </span>

        <div className="flex flex-col w-full">
          <label
            className={`text-[11.5px] uppercase font-light tracking-wider cursor-pointer ${showCalendar ? 'text-primary-900' : 'text-primary-500'}`}
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
            className="absolute left-0 top-[calc(100%+6px)] z-[100]"
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
