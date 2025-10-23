import PrimarySection from './PrimarySection';
import PrimaryButton from './PrimaryButton';

export default function ContactBanner() {
  return (
    <PrimarySection className="bg-gray-100 py-10 md:py-15">
      <div className="text-center w-[92%] md:w-[60%] mx-auto">
        <h2 className="text-xl md:text-3xl">
          Have a question or need assistance?
        </h2>
        <p className="mt-3 mb-5 font-extralight text-lg">
          Our professional team is here to help you 24/7 — whether it’s an
          airport transfer, hourly ride, or city-to-city journey. Let’s make
          your travel effortless and elegant.
        </p>
        <PrimaryButton size="small">Chat With Us</PrimaryButton>
      </div>
    </PrimarySection>
  );
}
