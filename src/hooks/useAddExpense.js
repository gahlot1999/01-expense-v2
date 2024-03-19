import { useMutation } from '@tanstack/react-query';
import { addExpense as addExpenseApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useAddExpense(reset) {
  const navigate = useNavigate();
  const { mutate: addExpense, status: expenseAddingStatus } = useMutation({
    mutationFn: addExpenseApi,
    onSuccess: () => {
      navigate(-1, { replace: true });
      toast.success('Expense added');
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => reset(),
  });

  return { addExpense, expenseAddingStatus };
}
