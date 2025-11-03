import { useVehicles } from '../../hooks/useVehicles';
import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import FleetCard from '../FleetCard';

export default function Fleet() {
  const { vehicles } = useVehicles();

  return (
    <PrimarySection className="pb-15 md:pb-20">
      <Container>
        <SectionTitle textAlign="center" subtitle="Our Fleet">
          Luxury Vehicles To Choose From
        </SectionTitle>
        <div className="mt-12 flex md:grid md:grid-cols-3 gap-6 overflow-x-scroll md:overflow-x-visible">
          {vehicles?.map((v, i) => (
            <FleetCard key={i} index={i} vehicle={v} />
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
