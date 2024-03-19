import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createBudget as createBudgetApi } from '../services/api';

export default function useAddBudget(reset) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { status: budgetAddingStatus, mutate: createBudget } = useMutation({
    mutationFn: createBudgetApi,
    onSuccess: () => {
      toast.success('Budget created');
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      navigate('/budgets', { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      reset();
    },
  });

  return { budgetAddingStatus, createBudget };
}