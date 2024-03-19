import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExpense as addExpenseApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useAddExpense(reset) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addExpense, status: expenseAddingStatus } = useMutation({
    mutationFn: addExpenseApi,
    onSuccess: (data) => {
      navigate(-1, { replace: true });
      queryClient.invalidateQueries({ queryKey: ['budget', data[0].budgetId] });
      toast.success('Expense added');
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => reset(),
  });

  return { addExpense, expenseAddingStatus };
}

// ! can use data which already fetched with query reacg
