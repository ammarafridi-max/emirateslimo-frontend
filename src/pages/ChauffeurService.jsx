import { Helmet } from 'react-helmet-async';
import Hero from '../components/HomeComponents/Hero';
import Process from '../components/HomeComponents/Process';
import WhyBookEmiratesLimo from '../components/HomeComponents/WhyBookEmiratesLimo';
import Services from '../components/HomeComponents/Services';
import Fleet from '../components/HomeComponents/Fleet';

export default function ChauffeurService() {
  return (
    <>
      <Helmet>
        <title>Luxury Chauffeur Service Dubai – Professional Drivers | Emirates Limo</title>
        <meta
          name="description"
          content="Experience luxury chauffeur service in Dubai with Emirates Limo. Premium vehicles, professional drivers, hourly and daily bookings, and seamless airport pickups. Reserve your chauffeur today"
        />
        <link rel="canonical" href="https://www.emirateslimo.com/chauffeur-service" />
      </Helmet>
      <Hero
        title="Book Your Dubai Chauffeur"
        subtitle="Luxury Chauffeur Service"
        text="Experience luxury chauffeur service across the UAE in luxury vehicles. Free 20 minutes waiting time, on time pick up and drop off, easy booking process. Book now!"
      />
      <Process title="Book Your Chauffeur in 4 Easy Steps" />
      <WhyBookEmiratesLimo />
      <Services />
      <Fleet />
    </>
  );
}
