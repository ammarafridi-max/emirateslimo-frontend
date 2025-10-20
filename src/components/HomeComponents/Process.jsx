import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';

const steps = [
  {
    title: 'Pickup & Dropoff',
    text: 'Enter your pickup and dropoff addresses, select your pickup date and time, and then click Search.',
  },
  {
    title: 'Choose Your Limo',
    text: 'Select from a variety of luxury, comfortable limousines that best fit your needs and requirements.',
  },
  {
    title: 'Enter Your Information',
    text: 'Provide essential details like your name, flight number, and contact info so we can keep you updated.',
  },
  {
    title: 'Secure Payment',
    text: 'Complete your payment safely to confirm your booking and enjoy a seamless travel experience.',
  },
];

export default function Process() {
  return (
    <PrimarySection id="process" className="py-15 md:py-20">
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="Our Process"
          className="text-center"
        >
          Book Your Ride in 4 Easy Steps
        </SectionTitle>

        <div className="mt-5 lg:mt-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative flex flex-col items-start rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 border border-gray-200"
            >
              <div className="mb-5 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-900 to-primary-700 text-white w-10 h-10 text-md font-light font-outfit shadow-md">
                {i + 1}
              </div>

              <h3 className="text-[20px] font-light font-outfit text-gray-900 tracking-wide mb-2 capitalize group-hover:text-primary-900 transition-colors">
                {step.title}
              </h3>

              <p className="text-[15.5px] font-extralight leading-relaxed text-gray-600">
                {step.text}
              </p>

              <LuArrowRight className="absolute bottom-6 right-6 text-gray-300 group-hover:text-primary-800 transition-transform group-hover:translate-x-1 duration-300" />
            </motion.div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
