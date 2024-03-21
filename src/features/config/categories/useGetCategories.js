import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../../services/api';

export default function useGetCategories(uid) {
  const { data: expenseCategories, isLoading: isExpenseCategoriesLoading } =
    useQuery({
      queryKey: ['categories'],
      queryFn: () => getCategories(uid),
    });

  return { expenseCategories, isExpenseCategoriesLoading };
}
