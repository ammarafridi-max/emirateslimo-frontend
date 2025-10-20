import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import { motion } from 'framer-motion';
import { LuPlane, LuBriefcase, LuMapPin } from 'react-icons/lu';

const services = [
  {
    icon: LuPlane,
    title: 'Airport Transfers',
    text: 'Reliable airport pick-up and drop-off in luxury sedans and SUVs, ensuring punctuality and comfort every time.',
    image: '/images/services/airport-transfer.jpg',
  },
  {
    icon: LuBriefcase,
    title: 'Chauffeur Service',
    text: 'Professional chauffeurs available hourly or full-day, ideal for business meetings, events, and corporate travel.',
    image: '/images/services/chauffeur-service.jpg',
  },
  {
    icon: LuMapPin,
    title: 'City Tours',
    text: 'Explore Dubai and Abu Dhabi in style — your private chauffeur will take you to the city’s top attractions at your pace.',
    image: '/images/services/city-tours.jpg',
  },
];

export default function Services() {
  return (
    <PrimarySection id="services" className="bg-white py-15 md:py-20">
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="Our Services"
          className="text-center"
        >
          Premium Chauffeur Experiences
        </SectionTitle>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
                  <service.icon className="text-[22px] text-accent-500" />
                  <h3 className="text-[20px] font-light tracking-wide">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Text */}
              <div className="p-6">
                <p className="text-[15.5px] font-extralight text-gray-600 leading-relaxed">
                  {service.text}
                </p>
              </div>

              {/* Accent line on hover */}
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent-500 transition-all duration-500 group-hover:w-full"></span>
            </motion.div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
