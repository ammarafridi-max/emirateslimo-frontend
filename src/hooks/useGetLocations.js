import { useQuery } from '@tanstack/react-query';
import { getLocationsApi } from '../services/apiLocations';

export function useGetLocations(query) {
  const {
    data: locations,
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    error,
  } = useQuery({
    queryKey: ['locations', query],
    queryFn: () => getLocationsApi(query),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return { locations, isLoadingLocations, isErrorLocations, error };
}
