import { useRef, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Calendar from '../Calendar';

export default function SelectTime({
  register,
  label,
  placeholder,
  setValue,
  name,
}) {
  const wrapperRef = useRef(null);
  const [time, setTime] = useState('');
  const [showTimeOptions, setShowTimeOptions] = useState(false);

  useOutsideClick(wrapperRef, () => setShowTimeOptions(false));

  return (
    <div className="w-full" ref={wrapperRef}>
      <input type="hidden" {...register(name)} />
      <div
        onClick={() => {
          setTime('');
          setShowTimeOptions(true);
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
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setShowTimeOptions(true);
            }}
          />
        </div>
      </div>
      <div className="w-full relative">
        {showTimeOptions && (
          <div className="absolute flex w-[300px] h-[250px] bg-white rounded-md border border-primary-300 mt-3 p-3">
            <div className="w-[33%]">
              <p className="text-center py-2">Hour</p>
              <div className="h-[180px] overflow-scroll">
                {Array.from({ length: 12 }, (_, i) => (
                  <p
                    className="px-2 font-extralight hover:bg-primary-100 cursor-pointer text-center overflow-scroll"
                    key={i}
                  >
                    {i + 1}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-[33%]">
              <p className="text-center py-2">Minute</p>
              <div className="h-[180px] overflow-scroll">
                {[0]}
                {Array.from({ length: 12 }, (_, i) => (
                  <p
                    className="px-2 font-extralight hover:bg-primary-100 cursor-pointer text-center"
                    key={i}
                  >
                    {i + 5}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
