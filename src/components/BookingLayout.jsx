import { BookingStepsLg, BookingStepsSm } from './BookingSteps';
import PrimarySection from './PrimarySection';
import Container from './Container';
import Currency from './Currency';

export default function BookingLayout({ children }) {
  return (
    <>
      {/* Navigation for larger devices */}
      <PrimarySection className="hidden lg:block bg-white relative py-3 lg:py-5 shadow-md shadow-gray-200 z-50">
        <Container className="grid grid-cols-[1fr_auto] lg:grid-cols-[2fr_8fr_2fr] items-center h-fit">
          <a href="/">
            <img src="/logo-light.webp" className="w-full object-contain" />
          </a>
          <BookingStepsLg />
          <div className="flex justify-end gap-3">
            <Currency />
          </div>
        </Container>
      </PrimarySection>

      {/* Navigation for smaller devices */}
      <PrimarySection className="block lg:hidden bg-gray-100 relative pt-4 lg:py-5">
        <Container className="grid grid-cols-[1fr_auto] lg:grid-cols-[2fr_8fr_2fr] items-center h-fit">
          <BookingStepsSm />
          <Currency />
        </Container>
      </PrimarySection>

      {/* Main content */}
      <PrimarySection className="bg-gray-100 lg:bg-gray-50">
        <Container className="py-5 lg:pt-6 lg:pb-10">
          <div className="sm:grid sm:grid-cols-[8fr_4fr] gap-6">{children}</div>
        </Container>
      </PrimarySection>
    </>
  );
}
