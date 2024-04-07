import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editExpense as editExpenseApi } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function useEditExpense() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const budgetId = useParams().id;
  const isBudgetEditFormOpen = location.pathname.includes('/editexpense');
  const navigate = useNavigate();
  const { mutate: editExpense, status: isExpenseEditing } = useMutation({
    mutationFn: editExpenseApi,
    onSuccess: () => {
      toast.success('Expense edited');
      isBudgetEditFormOpen
        ? navigate(-1, { replace: true })
        : queryClient.invalidateQueries({ queryKey: ['expenses', budgetId] });
    },
  });

  return { editExpense, isExpenseEditing };
}
