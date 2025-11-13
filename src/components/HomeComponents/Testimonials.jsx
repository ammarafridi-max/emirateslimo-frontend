import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import { motion } from 'framer-motion';
import { LuQuote } from 'react-icons/lu';

const testimonials = [
  {
    name: 'James Carter',
    position: 'Business Executive, London',
    text: 'Emirates Limo provided an unmatched level of professionalism. My chauffeur was early, the car was spotless, and the ride felt effortless.',
    image: '/images/testimonials/james.jpg',
  },
  {
    name: 'Aisha Al Mansouri',
    position: 'Entrepreneur, Dubai',
    text: 'Every detail was taken care of — from airport pickup to city travel. Emirates Limo is now my go-to for all business transfers.',
    image: '/images/testimonials/aisha.jpg',
  },
  {
    name: 'Michael Robinson',
    position: 'Frequent Traveler, New York',
    text: 'Luxury, punctuality, and peace of mind — exactly what I needed after a long-haul flight. Highly recommended.',
    image: '/images/testimonials/michael.jpg',
  },
];

export default function Testimonials() {
  return (
    <PrimarySection id="testimonials" className="bg-primary-900 py-15 lg:py-25">
      <Container>
        <SectionTitle
          type="secondary"
          textAlign="center"
          subtitle="Client Testimonials"
        >
          What Our Clients Say
        </SectionTitle>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col items-start bg-white p-8 rounded-2xl border border-primary-100 shadow-[0_6px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              {/* Quote icon */}
              <LuQuote className="text-accent-500 text-3xl mb-5 opacity-70" />

              {/* Review text */}
              <p className="text-[16px] font-extralight text-primary-600 leading-relaxed mb-6">
                “{t.text}”
              </p>

              {/* Client info */}
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[16px] font-medium text-primary-900 font-merriweather leading-tight">
                    {t.name}
                  </p>
                  <p className="text-[14px] text-primary-400 font-outfit">
                    {t.position}
                  </p>
                </div>
              </div>

              {/* Orange underline on hover */}
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent-500 transition-all duration-500 group-hover:w-full"></span>
            </motion.div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
