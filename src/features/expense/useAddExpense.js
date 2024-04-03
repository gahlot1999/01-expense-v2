import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExpense as addExpenseApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useAddExpense({ source, reset }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addExpense, status: expenseAddingStatus } = useMutation({
    mutationFn: addExpenseApi,
    onSuccess: (data) => {
      if (source !== 'emi') {
        navigate(-1, { replace: true });
        toast.success('Expense added');
      }
      queryClient.invalidateQueries({ queryKey: ['budget', data[0].budgetId] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => reset && reset(),
  });

  return { addExpense, expenseAddingStatus };
}
