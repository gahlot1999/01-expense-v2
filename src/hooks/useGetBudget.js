import { useQuery } from '@tanstack/react-query';
import { getBudget } from '../services/api';

export default function useGetBudget(id) {
  const { data: budget, isLoading: isBudgetLoading } = useQuery({
    queryKey: ['budget', id],
    queryFn: () => getBudget(id),
  });

  return { budget: budget && budget[0], isBudgetLoading };
}
