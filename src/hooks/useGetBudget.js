import { useQuery } from '@tanstack/react-query';
import { getBudgets } from '../services/api';

export default function useGetBudget(id) {
  const { data: budgets, isLoading: isBudgetLoading } = useQuery({
    queryKey: ['budgets'],
    queryFn: getBudgets,
  });

  const budget = budgets?.find((el) => el.id === Number(id));

  return { budget, isBudgetLoading };
}
