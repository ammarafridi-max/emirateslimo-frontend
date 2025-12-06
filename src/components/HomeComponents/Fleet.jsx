import { useVehicles } from '../../hooks/useVehicles';
import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import FleetCard from '../FleetCard';

export default function Fleet() {
  const { vehicles } = useVehicles();

  return (
    <PrimarySection className="pb-15 lg:pb-25">
      <Container>
        <SectionTitle textAlign="center" subtitle="Our Fleet">
          Luxury Vehicles To Choose From
        </SectionTitle>
        <div className="mt-12 flex lg:grid lg:grid-cols-3 gap-y-10 gap-x-7 overflow-x-scroll lg:overflow-x-visible">
          {vehicles?.map((v, i) => (
            <FleetCard key={i} index={i} vehicle={v} />
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
