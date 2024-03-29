import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense as deleteExpenseApi } from '../../services/api';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export default function useDeleteExpense(setIsConfirmDeleteExpenseOpen) {
  const { id: budgetId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteExpense, status: isExpenseDeleting } = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses', budgetId],
      });
      queryClient.invalidateQueries({
        queryKey: ['budget', budgetId],
      });
      toast.success('Expense deleted');
      setIsConfirmDeleteExpenseOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteExpense, isExpenseDeleting };
}
