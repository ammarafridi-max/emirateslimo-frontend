import { useVehicles } from '../../hooks/useVehicles';
import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import { motion } from 'framer-motion';
import { LuUsers, LuBriefcase, LuLuggage } from 'react-icons/lu';

export default function Fleet() {
  const { vehicles, isLoadingVehicles } = useVehicles();

  return (
    <PrimarySection className="py-15 md:py-20">
      <Container>
        <SectionTitle textAlign="center" subtitle="Our Fleet">
          Luxury Vehicles To Choose From
        </SectionTitle>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles?.map((v, i) => (
            <motion.div
              key={v._id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-primary-100 shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              {/* Vehicle Image */}
              <div className="relative h-50 overflow-hidden">
                <img
                  src={v.featuredImage || '/images/fleet-placeholder.jpg'}
                  alt={v.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-[20px] font-light tracking-wide">
                    {v.brand} {v.model}
                  </h3>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 text-primary-500">
                  <div className="flex items-center gap-2">
                    <LuUsers className="text-[18px]" />
                    <span className="text-[15px] font-light">
                      {v.passengers || 4} Passengers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuLuggage className="text-[18px]" />
                    <span className="text-[15px] font-light">
                      {v.luggage || 2} Bags
                    </span>
                  </div>
                </div>

                <p className="text-[15.5px] font-extralight text-primary-600 leading-relaxed mb-6">
                  {v.description ||
                    'Travel in comfort and style with our chauffeur-driven vehicles designed for ultimate convenience.'}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-medium text-primary-900">
                    AED {v.basePrice || 250}{' '}
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
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
