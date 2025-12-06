import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PrimarySection from '../components/PrimarySection';
import Container from '../components/Container';
import PageHeading from '../components/PageHeading';
import SectionTitle from '../components/SectionTitle';

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Emirates Limo</title>
        <meta name="description" content="Read the terms and conditions of Emirates Limo." />
        <link rel="canonical" href="https://www.emirateslimo.com/terms-and-conditions" />
      </Helmet>
      <PrimarySection className="py-12.5">
        <Container>
          <PageHeading className="text-[32px] lg:text-[48px] leading-[1.2] font-light mb-3">
            Terms & Conditions
          </PageHeading>

          <p className="text-xl font-extralight" mt="20px">
            Welcome to Emirates Limo. By accessing or using our website (https://www.emirateslimo.com ) or booking any
            service with us, you agree to comply with and be bound by the Terms & Conditions below. Please read them
            carefully before proceeding.
          </p>

          <SectionTitle className="my-10">General Information</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">
                Emirates Limo provides professional chauffeur services, airport transfers, hourly bookings, and luxury
                transportation across Dubai, Abu Dhabi, and Sharjah.
              </li>
              <li className="pl-2">
                All services are operated through licensed transportation partners and professional chauffeurs who meet
                UAE regulatory requirements.
              </li>
              <li className="pl-2">
                These Terms & Conditions apply to all website visitors, users, and customers who book services with
                Emirates Limo
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">Use Of Services</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">
                By using our website or booking a service, you confirm that you are at least 18 years old or have
                parental/guardian consent.
              </li>
              <li className="pl-2">You agree to use our services solely for lawful and legitimate purposes.</li>
              <li className="pl-2">
                You may not use our services to cause disruption, engage in fraudulent activities, or violate UAE laws
                in any way.
              </li>
              <li className="pl-2">
                Emirates Limo reserves the right to refuse service to anyone engaging in inappropriate, unsafe, or
                unlawful behavior.
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">Bookings & Service Policy</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">
                All bookings must be made through our website or official communication channels.
              </li>
              <li className="pl-2">
                It is your responsibility to provide accurate pickup and drop-off details, dates, flight numbers, and
                contact information.
              </li>
              <li className="pl-2">
                For airport transfers, our chauffeurs track flights; however, delays caused by immigration, baggage,
                weather, or external factors are outside our control.
              </li>
              <li className="pl-2">
                The customer must be reachable via phone or WhatsApp upon arrival to avoid delays in vehicle dispatch.
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">Pricing, Payments & Refunds</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">All prices listed on the website are in AED unless stated otherwise.</li>
              <li className="pl-2">
                Payments must be made online through secure methods provided on our website (Stripe, card payments,
                etc.).
              </li>
              <li className="pl-2">
                Payments are non-refundable except when a duplicate payment occurs or when the service cannot be
                delivered due to a system error or Emirates Limo operational issue.
              </li>
              <li className="pl-2">
                Refunds, if approved, are processed back to the original payment method within 7–14 business days.
              </li>
              <li className="pl-2">
                Any booking changes requested by the customer must be communicated at least 12 hours before the pickup
                time. Accepting such changes is subject to availability.
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">Waiting Time & No-Show Policy</SectionTitle>

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xl mb-3">Airport Transfers</p>
              <p className="text-xl font-extralight">
                <ul className="flex flex-col gap-3 list-decimal pl-5">
                  <li className="pl-2">
                    60 minutes of complimentary waiting time is included from the actual flight landing time.
                  </li>
                  <li className="pl-2">After the complimentary period, additional charges may apply.</li>
                </ul>
              </p>
            </div>
            <div>
              <p className="text-xl mb-3">Non-Airport Pickups</p>
              <p className="text-xl font-extralight">
                <ul className="flex flex-col gap-3 list-decimal pl-5">
                  <li className="pl-2">15 minutes of complimentary waiting time is included.</li>
                </ul>
              </p>
            </div>
            <div>
              <p className="text-xl mb-3">No-Show</p>
              <p className="text-xl font-extralight mb-3">
                No-show bookings are fully charged and non-refundable. A booking is considered a no-show if:
              </p>
              <p className="text-xl font-extralight">
                <ul className="flex flex-col gap-3 list-decimal pl-5">
                  <li className="pl-2">The customer cannot be contacted for 30 minutes after pickup time.</li>
                  <li className="pl-2">The customer fails to appear at the designated meeting point.</li>
                </ul>
              </p>
            </div>
          </div>

          <SectionTitle className="my-10">Modifications & Cancellations</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">
                Cancellations made 12 hours or more before the pickup time may be eligible for a partial or full refund
                depending on operational commitments.
              </li>
              <li className="pl-2">Cancellations made within 12 hours of the pickup time are non-refundable.</li>
              <li className="pl-2">
                Emirates Limo reserves the right to cancel or reschedule a booking due to unforeseen circumstances such
                as vehicle breakdowns, safety concerns, or force majeure events. In such cases, a full refund will be
                issued.
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">User Responsibilities</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">You must ensure all order details provided are accurate and complete.</li>
              <li className="pl-2">
                You are responsible for ensuring you are ready at the pickup point at the scheduled time.
              </li>
              <li className="pl-2">Damages to the vehicle caused by passengers may result in additional charges.</li>
              <li className="pl-2">
                Smoking, alcohol consumption, and illegal substances are strictly prohibited inside the vehicle in
                accordance with UAE law.
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">Vehicle & Chauffeur Allocation</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">
                Emirates Limo may assign any suitable vehicle of the same category or higher in case the originally
                selected vehicle is unavailable.
              </li>
              <li className="pl-2">
                Chauffeurs are allocated based on availability, route, and operational requirements.
              </li>
              <li className="pl-2">Requests for specific chauffeurs or vehicles cannot be guaranteed.</li>
            </ul>
          </p>

          <SectionTitle className="my-10">Limitation of Liability</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">Emirates Limo is not responsible for:</li>
              <ul className="flex flex-col gap-3 list-disc pl-8">
                <li>Delays caused by traffic, weather, road closures, or external factors.</li>
                <li>Missed flights due to inaccurate information provided by the customer.</li>
                <li>Loss of personal items left inside the vehicle.</li>
              </ul>
              <li className="pl-2">Our liability is limited strictly to the cost of the service purchased.</li>
              <li className="pl-2">
                Emirates Limo is not liable for any indirect, incidental, or consequential damages.
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">Intellectual Property Rights</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">
                All content on this website—including logos, text, graphics, photos, and software—is the property of
                Emirates Limo.
              </li>
              <li className="pl-2">
                You may not copy, reproduce, or distribute any material without prior written permission.
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">Privacy Policy</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">
                We respect your privacy. Personal information is collected only for booking and service-related
                purposes.
              </li>
              <li className="pl-2">
                We do not sell or share customer data with third parties except for operational requirements (e.g.,
                chauffeurs or payment processors).
              </li>
              <li className="pl-2">
                Full details can be found in our{' '}
                <Link className="text-accent-500" to="/privacy-policy">
                  Privacy Policy
                </Link>
                .
              </li>
            </ul>
          </p>

          <SectionTitle className="my-10">Amendments to Terms</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">
                Emirates Limo may update or modify these Terms & Conditions at any time without prior notice.
              </li>
              <li className="pl-2">Continued use of our services constitutes acceptance of the updated Terms.</li>
            </ul>
          </p>

          <SectionTitle className="my-10">Governing Law</SectionTitle>

          <p className="text-xl font-extralight">
            <ul className="flex flex-col gap-3 list-decimal pl-5">
              <li className="pl-2">These Terms & Conditions are governed by the laws of the United Arab Emirates.</li>
              <li className="pl-2">Any disputes shall be resolved under the exclusive jurisdiction of UAE courts.</li>
            </ul>
          </p>
        </Container>
      </PrimarySection>
    </>
  );
}
