import { useMutation } from '@tanstack/react-query';
import { getLatLngApi } from '../services/apiLocations';

export function useGetLatLng() {
  const { mutateAsync: getCoordinates, isLoading: isLoadingCoordinates } = useMutation({
    mutationFn: (query) => getLatLngApi(query),
  });

  return { getCoordinates, isLoadingCoordinates };
}
