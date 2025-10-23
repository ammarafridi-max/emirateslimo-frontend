import { useQuery } from '@tanstack/react-query';
import { getLocationsApi } from '../services/apiLocations';
import { useEffect, useState } from 'react';

// small debounce helper
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function useGetLocations(query) {
  const debouncedQuery = useDebounce(query);

  const {
    data: locations,
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    error,
  } = useQuery({
    queryKey: ['locations', debouncedQuery],
    queryFn: () => getLocationsApi(debouncedQuery),
    enabled: debouncedQuery.length >= 3, // only fetch if input is long enough
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return { locations, isLoadingLocations, isErrorLocations, error };
}
