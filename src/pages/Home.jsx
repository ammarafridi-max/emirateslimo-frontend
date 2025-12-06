import { Helmet } from 'react-helmet-async';
import React, { Suspense } from 'react';
import Hero from '../components/HomeComponents/Hero';
const Process = React.lazy(() => import('../components/HomeComponents/Process'));
const WhyBookEmiratesLimo = React.lazy(() => import('../components/HomeComponents/WhyBookEmiratesLimo'));
const Services = React.lazy(() => import('../components/HomeComponents/Services'));
const Testimonials = React.lazy(() => import('../components/HomeComponents/Testimonials'));
const Fleet = React.lazy(() => import('../components/HomeComponents/Fleet'));

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Chauffeur Service Dubai - Luxury & Professional - Emirates Limo</title>
        <meta
          name="description"
          content="Experience luxury and convenience with our premier chauffeur and airport transfer service in Dubai. Book now for a seamless travel experience."
        />
        <link rel="canonical" href="https://www.emirateslimo.com" />
      </Helmet>
      <Hero />
      <Suspense fallback={null}>
        <Process />
      </Suspense>
      <Suspense fallback={null}>
        <WhyBookEmiratesLimo />
      </Suspense>
      <Suspense fallback={null}>
        <Services />
      </Suspense>
      <Suspense fallback={null}>
        <Fleet />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
    </>
  );
}
