import PrimaryButton from '../components/PrimaryButton';
import Container from '../components/Container';
import PrimarySection from '../components/PrimarySection';
import PrimaryLink from '../components/PrimaryLink';

export default function PageNotFound() {
  return (
    <PrimarySection>
      <Container>
        <div className="h-dvh flex flex-col items-center justify-center gap-6">
          <h1 className="font-merriweather text-center text-primary-800 text-7xl font-bold">404 Error!</h1>
          <h2 className="font-nunito text-center text-3xl font-normal">The page you're looking for doesn't exist.</h2>
          <PrimaryLink to="/">Go to Home</PrimaryLink>
        </div>
      </Container>
    </PrimarySection>
  );
}
