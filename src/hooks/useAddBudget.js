import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addBudget as addBudgetApi } from '../services/api';

export default function useAddBudget(reset) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { status: isBudgetAdding, mutate: createBudget } = useMutation({
    mutationFn: addBudgetApi,

    onSuccess: (data) => {
      toast.success('Budget created');
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      navigate(`/budgets/${data[0].id}`, { replace: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSettled: () => {
      reset();
    },
  });

  return { isBudgetAdding, createBudget };
}
