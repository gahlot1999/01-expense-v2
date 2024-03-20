import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../../services/api';

export default function useGetCategories() {
  const { data: expenseCategories, isLoading: isExpenseCategoriesLoading } =
    useQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
    });

  return { expenseCategories, isExpenseCategoriesLoading };
}
