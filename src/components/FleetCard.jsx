import { motion } from 'framer-motion';
import { LuUsers, LuLuggage } from 'react-icons/lu';

export default function FleetCard({ index, vehicle }) {
  return (
    <motion.div className="min-w-100 md:min-w-auto group relative overflow-hidden rounded-2xl bg-white border border-primary-100 md:shadow-md md:hover:shadow-xl transition-all duration-300">
      <div className="relative h-50 overflow-hidden bg-gray-100">
        <img
          src={vehicle?.featuredImage || '/images/fleet-placeholder.jpg'}
          alt={vehicle?.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
        <div className="absolute bottom-5 left-5 text-white">
          <h3 className="text-[20px] font-light tracking-wide">
            {vehicle?.brand} {vehicle?.model}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4 text-primary-500">
          <div className="flex items-center gap-2">
            <LuUsers className="text-[18px]" />
            <span className="text-[15px] font-light">
              {vehicle?.passengers || 4} Passengers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LuLuggage className="text-[18px]" />
            <span className="text-[15px] font-light">
              {vehicle?.luggage || 2} Bags
            </span>
          </div>
        </div>

        <p className="text-[15.5px] font-extralight text-primary-600 leading-relaxed mb-6">
          {vehicle?.description ||
            'Travel in comfort and style with our chauffeur-driven vehicles designed for ultimate convenience.'}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-[16px] font-medium text-primary-900">
            AED {vehicle?.pricing?.pricePerHour}{' '}
            <span className="text-[13px] font-light text-primary-400">
              /hour
            </span>
          </p>

          <button className="bg-accent-500 text-white text-[14px] px-5 py-2 rounded-full transition-all duration-300 hover:bg-accent-600">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
