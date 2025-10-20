import { MdOutlineLuggage, MdOutlineMan2, MdOutlineStar } from 'react-icons/md';

export default function VehicleLoadingCard() {
  return (
    <div className="sm:grid grid-cols-[4.5fr_7.5fr] items-start gap-5 rounded-lg bg-white p-5 shadow-md animate-pulse">
      <div className="w-full h-45 bg-primary-200 rounded-lg overflow-hidden"></div>
      <div>
        <div className="w-50 h-[18px] bg-primary-200 mb-2"></div>
        <div className="w-15 h-[16px] bg-primary-200 mb-4"></div>
        <div className="w-full h-[14px] bg-primary-200 mb-1"></div>
        <div className="w-[60%] h-[14px] bg-primary-200 mb-4"></div>
        <div className="flex items-center gap-5 mb-3">
          <div className="flex items-center">
            <MdOutlineLuggage className="text-xl" />
            <div className="w-5 h-5 bg-primary-200 ml-2"></div>
          </div>
          <div className="flex items-center">
            <MdOutlineMan2 className="text-xl" />
            <div className="w-5 h-5 bg-primary-200 ml-2"></div>
          </div>
          <div className="flex items-center">
            <MdOutlineStar className="text-xl" />
            <div className="w-5 h-5 bg-primary-200 ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
