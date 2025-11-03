import { useQuery } from '@tanstack/react-query';
import { getCurrenciesApi } from '../services/apiCurrencies';

export function useCurrencies() {
  const { data: currencies, isLoading: isLoadingCurrencies } = useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrenciesApi,
  });

  return { currencies, isLoadingCurrencies };
}
