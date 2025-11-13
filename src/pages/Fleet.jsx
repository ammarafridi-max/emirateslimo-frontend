import Container from '../components/Container';
import FleetCard from '../components/FleetCard';
import PageHeading from '../components/PageHeading';
import PrimarySection from '../components/PrimarySection';
import { useVehicles } from '../hooks/useVehicles';
import { motion } from 'framer-motion';

export default function Fleet() {
  const { vehicles, isLoadingVehicles } = useVehicles();

  return (
    <PrimarySection className="py-10 lg:py-15 bg-white text-black">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <PageHeading className="text-[32px] lg:text-[44px] font-light leading-[1.1] mb-4">
            Our Fleet
          </PageHeading>
          <p className="text-gray-600 text-base lg:text-lg font-light">
            Experience comfort, elegance, and style. Our fleet includes a range
            of luxury sedans, SUVs, and vans to suit every occasion — from
            airport transfers to private city tours.
          </p>
        </div>

        {/* Fleet Cards Section */}
        {isLoadingVehicles ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : vehicles?.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {vehicles.map((veh, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <FleetCard index={i} vehicle={veh} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 font-light py-10">
            No vehicles available at the moment. Please check back soon.
          </p>
        )}
      </Container>
    </PrimarySection>
  );
}
