import { motion } from 'framer-motion';
import Container from '../Container';
import PrimarySection from '../PrimarySection';
import PageHeading from '../PageHeading';
import LimoForm from '../LimoForm';

export default function Hero() {
  return (
    <PrimarySection className="relative py-10 lg:py-15">
      <div className="absolute max-h-80 lg:max-h-none inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-center"></div>
      <div className="absolute max-h-80 lg:max-h-none inset-0 bg-gradient-to-br from-black/90 to-black/50 lg:bg-gradient-to-r lg:from-black/95 lg:via-black/50 lg:to-transparent"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="block lg:grid lg:grid-cols-[5.7fr_4.3fr] items-start justify-between gap-2 lg:items-center"
        >
          <div className="min-h-fit">
            <PageHeading className="text-white text-[30px] lg:text-[50px] leading-[1.1] font-light mb-4 lg:mb-0">
              Book Your <span className="text-accent-500">Chauffeur</span>
            </PageHeading>

            <p className="text-[17px] lg:text-[19px] font-extralight text-white/80 max-w-xl leading-relaxed mt-4">
              Experience refined travel with Emirates Limo — premium vehicles, professional chauffeurs, and seamless
              airport transfers across the UAE.
            </p>

            <div className="h-[3px] w-24 bg-gradient-to-r from-primary-400 to-transparent mt-7 mb-6 lg:mb-0"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <LimoForm />
          </motion.div>
        </motion.div>
      </Container>
    </PrimarySection>
  );
}
