import { Helmet } from 'react-helmet-async';
import Hero from '../components/HomeComponents/Hero';
import Process from '../components/HomeComponents/Process';
import WhyBookEmiratesLimo from '../components/HomeComponents/WhyBookEmiratesLimo';
import Services from '../components/HomeComponents/Services';
import Fleet from '../components/HomeComponents/Fleet';

export default function DubaiAirportTransfer() {
  return (
    <>
      <Helmet>
        <title>Dubai Airport Transfer - Book Now - Emirates Limo</title>
      </Helmet>
      <Hero
        title="Book Your Dubai Airport Transfer"
        subtitle=""
        text="Seamless, premium Dubai airport transfers with 60 minutes waiting time at the airport, and professional, multi-lingual and experienced chauffeurs. On time pick up and drop off."
      />
      <Process title="Book Your Airport Transfer in 4 Easy Steps" />
      <WhyBookEmiratesLimo />
      <Services />
      <Fleet />
    </>
  );
}
