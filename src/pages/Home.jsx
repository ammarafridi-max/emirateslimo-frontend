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
