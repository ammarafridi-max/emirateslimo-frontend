import Container from '../Container';
import PrimarySection from '../PrimarySection';
import PageHeading from '../PageHeading';
import LimoForm from '../LimoForm';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <PrimarySection className="relative py-10 md:py-15 bg-primary-900">
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/30 to-transparent"></div>

      <Container className="relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="block md:grid md:grid-cols-[5.7fr_4.3fr] items-start justify-between gap-2 lg:items-center"
        >
          <div>
            <PageHeading className="text-white text-[30px] md:text-[50px] leading-[1.1] font-light mb-4 md:mb-0">
              Book Your <span className="text-accent-500">Chauffeur</span>
            </PageHeading>

            <p className="text-[17px] md:text-[19px] font-extralight text-white/80 max-w-xl leading-relaxed mt-4">
              Experience refined travel with Emirates Limo — premium vehicles,
              professional chauffeurs, and seamless airport transfers across the
              UAE.
            </p>

            <div className="h-[3px] w-24 bg-gradient-to-r from-primary-400 to-transparent mt-7 mb-6 md:mb-0"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LimoForm />
          </motion.div>
        </motion.div>
      </Container>
    </PrimarySection>
  );
}
