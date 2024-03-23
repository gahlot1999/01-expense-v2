import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '../../services/api';

export default function useGetExpenses(id, uid) {
  const { data: expenses, isLoading: isExpensesLoading } = useQuery({
    queryKey: ['expenses', id],
    queryFn: () => getExpenses(id, uid),
  });

  return { expenses, isExpensesLoading };
}
