import { useQuery } from '@tanstack/react-query';
import { getBudgets } from '../../services/api';

export default function useGetBudgets(uid) {
  const { data: budgets, isLoading: isBudgetsLoading } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => getBudgets(uid),
  });

  return { budgets, isBudgetsLoading };
}
