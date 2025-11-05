import { Helmet } from 'react-helmet-async';
import Hero from '../components/HomeComponents/Hero';
import Process from '../components/HomeComponents/Process';
import WhyBookEmiratesLimo from '../components/HomeComponents/WhyBookEmiratesLimo';
import Services from '../components/HomeComponents/Services';
import Testimonials from '../components/HomeComponents/Testimonials';
import Fleet from '../components/HomeComponents/Fleet';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Dubai Airport Transfers & Chauffeur Service - Emirates Limo
        </title>
        <meta
          name="description"
          content="Luxury chauffeur rides and airport transfers in Dubai with Emirates Limo. Multilingual, licensed, and experienced chauffeurs. Book now."
        />
      </Helmet>
      <Hero />
      <Process />
      <WhyBookEmiratesLimo />
      <Services />
      <Fleet />
      <Testimonials />
    </>
  );
}
