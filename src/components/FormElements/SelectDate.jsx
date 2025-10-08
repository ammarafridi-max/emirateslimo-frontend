import { useRef, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Calendar from '../Calendar';
import { format } from 'date-fns';

export default function SelectDate({
  register,
  label,
  placeholder,
  setValue,
  name,
}) {
  const wrapperRef = useRef(null);
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  useOutsideClick(wrapperRef, () => setShowCalendar(false));

  return (
    <div className="w-full" ref={wrapperRef}>
      <input type="hidden" {...register(name)} />
      <div
        onClick={() => {
          setDate('');
          setShowCalendar(true);
        }}
        className="flex items-center gap-3 bg-primary-100 p-3 rounded-md duration-300 cursor-pointer hover:bg-primary-200"
      >
        <span className="text-primary-600">
          <FaCalendarDays />
        </span>
        <div className="flex flex-col w-full">
          <label className="text-[12px] text-gray-500 uppercase font-light cursor-pointer">
            {label}
          </label>
          <input
            className="outline-0 w-full text-[15px] placeholder:text-primary-400 cursor-pointer"
            placeholder={placeholder}
            value={
              date && format(new Date(date).toLocaleDateString(), 'dd LLLL y')
            }
            onChange={(e) => {
              setDate(e.target.value);
              setShowCalendar(true);
            }}
          />
        </div>
      </div>
      <div className="w-full relative">
        {showCalendar && (
          <Calendar
            onDateClick={(date) => {
              setShowCalendar(false);
              setDate(date);
              setValue(name, date);
            }}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            // isDateDisabled={(date) => minDate && date < minDate}
          />
        )}
      </div>
    </div>
  );
}
