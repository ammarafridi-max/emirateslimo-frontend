import BookingSteps from './BookingSteps';
import PrimarySection from './PrimarySection';
import Container from './Container';
import Footer from './Footer';
import Currency from './Currency';

export default function BookingLayout({ children }) {
  return (
    <>
      <PrimarySection className="bg-white relative py-3 lg:py-5 shadow-md shadow-gray-200 z-50">
        <Container className="grid grid-cols-[1fr_auto] lg:grid-cols-[2fr_8fr_2fr] items-center h-fit">
          <a className="hidden lg:block" href="/">
            <img src="/logo-light.webp" className="w-full object-contain" />
          </a>
          <BookingSteps />
          <div className="flex justify-end gap-3">
            <Currency />
          </div>
        </Container>
      </PrimarySection>

      <PrimarySection className="bg-gray-100 lg:bg-gray-50">
        <Container className="py-6 lg:pt-6 lg:pb-10">
          <div className="sm:grid sm:grid-cols-[8fr_4fr] gap-6">{children}</div>
        </Container>
      </PrimarySection>

      <Footer />
    </>
  );
}
