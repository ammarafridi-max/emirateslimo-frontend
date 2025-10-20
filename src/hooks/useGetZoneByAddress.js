import { useQuery } from '@tanstack/react-query';
import { getZoneByAddressApi } from '../services/apiZones';

export function useGetZoneByAddress() {
  const { data: zone, isLoading: isLoadingZone } = useQuery({
    queryKey: ['zone'],
    queryFn: ({ lat, lng }) => getZoneByAddressApi({ lat, lng }),
  });

  return { zone, isLoadingZone };
}
