import { Link, useLocation, useNavigate } from 'react-router-dom';
import { bookingSteps } from '../data/bookingSteps';
import { FaCheck } from 'react-icons/fa6';
import { HiOutlineArrowLeft } from 'react-icons/hi2';

export default function BookingSteps() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStepIndex = bookingSteps.findIndex(
    (step) => step.page === location.pathname
  );
  const currentStep = bookingSteps[currentStepIndex];
  const previousStep = bookingSteps[currentStepIndex - 1];

  return (
    <>
      <div className="hidden md:flex justify-center gap-15 mx-auto z-50">
        {bookingSteps.map((item, i) => {
          const currentStepIndex = bookingSteps.findIndex(
            (step) => step.page === location.pathname
          );
          const isCompleted = i < currentStepIndex;
          const isActive = i === currentStepIndex;

          return (
            <Link
              key={i}
              onClick={(e) => {
                if (!isCompleted && !isActive) e.preventDefault();
              }}
              to={item.page}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`w-8 h-8 text-sm flex items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : isCompleted
                      ? 'bg-green-600 text-white'
                      : 'bg-primary-100 text-primary-400'
                }`}
              >
                {isCompleted ? <FaCheck /> : i + 1}
              </span>
              <span
                className={`text-sm ${
                  isActive
                    ? 'text-black font-medium'
                    : isCompleted
                      ? 'text-primary-900'
                      : 'text-primary-300'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex sm:hidden items-center justify-between bg-white">
        {previousStep ? (
          <button onClick={() => navigate(previousStep.page)}>
            <HiOutlineArrowLeft size={20} />
          </button>
        ) : (
          <span className="w-6" />
        )}

        <span className="text-md font-light">
          {currentStepIndex + 1}. {currentStep?.name}
        </span>

        <span className="w-6" />
      </div>
    </>
  );
}
