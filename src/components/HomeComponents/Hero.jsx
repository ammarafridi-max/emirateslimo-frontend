import Container from '../Container';
import PrimarySection from '../PrimarySection';
import PageHeading from '../PageHeading';
import LimoForm from '../LimoForm';

export default function Hero() {
  return (
    <PrimarySection className="bg-primary-900 py-10">
      <Container>
        <div className="flex flex-col lg:grid lg:grid-cols-[7fr_5fr] lg:items-center justify-between gap-5">
          <PageHeading className="text-white">Book Your Chauffeur</PageHeading>
          <div>
            <LimoForm />
          </div>
        </div>
      </Container>
    </PrimarySection>
  );
}
