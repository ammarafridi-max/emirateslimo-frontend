import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import { motion } from 'framer-motion';
import { LuClock, LuShieldCheck, LuCrown, LuMapPin } from 'react-icons/lu';

const reasons = [
  {
    icon: LuCrown,
    title: 'Luxury Fleet',
    text: 'Experience ultimate comfort in our premium selection of Sedans, SUVs, and Vans — all impeccably maintained and chauffeur-driven.',
  },
  {
    icon: LuShieldCheck,
    title: 'Trusted Professionals',
    text: 'Our vetted chauffeurs ensure a safe, private, and punctual ride — every time, for every traveler.',
  },
  {
    icon: LuClock,
    title: 'Always On Time',
    text: 'Your time matters. Our real-time tracking and pre-scheduled bookings ensure prompt arrivals and departures.',
  },
  {
    icon: LuMapPin,
    title: 'Nationwide Coverage',
    text: 'From Dubai to Abu Dhabi and beyond, we serve all major airports and cities across the UAE with reliability and style.',
  },
];

export default function WhyBookEmiratesLimo() {
  return (
    <PrimarySection
      id="why-book"
      className="bg-[#0c0c0c] py-15 md:py-20 text-white"
    >
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="Why Choose Us"
          type="secondary"
        >
          Why Book Emirates Limo?
        </SectionTitle>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative flex flex-col items-start rounded-2xl bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-6 border border-white/30 shadow-[0_6px_25px_rgba(255,255,255,0.03)] hover:shadow-[0_6px_35px_rgba(255,255,255,0.06)] transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-5 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white text-xl shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                <item.icon />
              </div>

              <h3 className="text-[18.5px] font-light font-outfit tracking-wide mb-2 group-hover:text-primary-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-[15.5px] font-extralight text-white/70 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
