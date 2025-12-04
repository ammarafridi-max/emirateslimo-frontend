import { motion } from 'framer-motion';
import Container from '../Container';
import PrimarySection from '../PrimarySection';
import PageHeading from '../PageHeading';
import LimoForm from '../LimoForm';

export default function Hero() {
  return (
    <PrimarySection className="relative py-14 lg:py-14">
      <div className="absolute h-80 md:h-full inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-center"></div>
      <div className="absolute h-80 md:h-full inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10 lg:bg-gradient-to-r lg:from-black/95 lg:via-black/60 lg:to-transparent"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[6fr_4fr] items-center gap-10"
        >
          {/* LEFT SIDE TEXT */}
          <div className="text-white">
            <p className="uppercase tracking-[3px] text-accent-400 text-sm mb-3 font-light">
              Premium Chauffeur Service
            </p>

            <PageHeading className="text-[32px] lg:text-[54px] leading-[1.1] font-light mb-3">
              Book Your Chauffeur
            </PageHeading>

            <p className="text-[17px] lg:text-[19px] font-[200] text-white/80 max-w-xl leading-6.5 mt-3">
              Experience refined travel with Emirates Limo — premium vehicles, professional chauffeurs, and seamless
              airport transfers across the UAE.
            </p>
          </div>

          {/* FORM */}

          <LimoForm />
        </motion.div>
      </Container>
    </PrimarySection>
  );
}
