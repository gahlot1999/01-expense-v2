import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editExpense as editExpenseApi } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useEditExpense({ source }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: editExpense, status: isExpenseEditing } = useMutation({
    mutationFn: editExpenseApi,
    onSuccess: () => {
      toast.success('Expense edited');
      if (source === 'isPaid') {
        queryClient.invalidateQueries();
      } else {
        navigate(-1, { replace: true });
      }
    },
  });

  return { editExpense, isExpenseEditing };
}
