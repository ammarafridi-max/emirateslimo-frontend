import { useRef } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { FaXmark } from 'react-icons/fa6';

export default function VehicleGallery({ showGallery, setShowGallery }) {
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowGallery(false));

  return (
    <div className="fixed top-0 left-0 z-50 h-full w-full bg-black/70 flex items-center justify-center">
      <button
        type="button"
        className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
        onClick={() => setShowGallery(false)}
      >
        <FaXmark />
      </button>
      <div className="flex flex-col gap-4" ref={wrapperRef}>
        <div className="w-160 aspect-video bg-primary-200 rounded-xl"></div>
        <div className="flex justify-between">
          <div className="w-29 aspect-video bg-primary-200 rounded-md"></div>
          <div className="w-29 aspect-video bg-primary-200 rounded-md"></div>
          <div className="w-29 aspect-video bg-primary-200 rounded-md"></div>
          <div className="w-29 aspect-video bg-primary-200 rounded-md"></div>
          <div className="w-29 aspect-video bg-primary-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
