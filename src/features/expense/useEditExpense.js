import { useMutation } from '@tanstack/react-query';
import { editExpense as editExpenseApi } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useEditExpense() {
  const navigate = useNavigate();
  const { mutate: editExpense, status: isExpenseEditing } = useMutation({
    mutationFn: editExpenseApi,
    onSuccess: () => {
      toast.success('Expense edited');
      navigate(-1, { replace: true });
    },
  });

  return { editExpense, isExpenseEditing };
}
