import { useQuery } from '@tanstack/react-query';
import { getQuote } from '../services/api';

export default function useGetQuote() {
  const { data: quote, isLoading: isQuoteLoading } = useQuery({
    queryKey: ['quote'],
    queryFn: getQuote,
  });

  return { quote: quote && quote[0]?.quote, isQuoteLoading };
}
