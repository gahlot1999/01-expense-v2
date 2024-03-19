import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '../services/api';

export default function useGetExpenses(id) {
  const { data: expenses, isLoading: isExpensesLoading } = useQuery({
    queryKey: ['expenses', id],
    queryFn: () => getExpenses(id),
  });

  return { expenses, isExpensesLoading };
}
