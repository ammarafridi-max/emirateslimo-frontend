import { useState } from 'react';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';

export default function FAQAccordion({ question, children }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="w-full mb-5 font-outfit">
      <button
        onClick={() => setShowAnswer((prev) => !prev)}
        className={`w-full rounded-lg px-5 py-3 grid grid-cols-[1fr_auto] gap-4 items-center text-left font-light text-md duration-300 cursor-pointer shadow-md ${
          showAnswer
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 text-black hover:shadow-lg'
        }`}
      >
        <span className="text-base sm:text-lg">{question}</span>
        {showAnswer ? (
          <HiOutlineMinus className="text-xl sm:text-2xl" />
        ) : (
          <HiOutlinePlus className="text-xl sm:text-2xl" />
        )}
      </button>

      {showAnswer && (
        <div className="font-outfit font-light mt-3 px-5 text-gray-700 text-md sm:text-lg duration-300">
          {children}
        </div>
      )}
    </div>
  );
}
