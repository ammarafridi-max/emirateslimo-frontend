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
        <title>Dubai Airport Transfers & Chauffeur Service - Emirates Limo</title>
        <meta
          name="description"
          content="Luxury chauffeur rides and airport transfers in Dubai with Emirates Limo. Multilingual, licensed, and experienced chauffeurs. Book now."
        />
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
