import { useMutation } from '@tanstack/react-query';
import { updateBudget as updateBudgetApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useUpdateBudget() {
  const navigate = useNavigate();
  const { mutate: updateBudget, status: isBudgetUpdating } = useMutation({
    mutationFn: updateBudgetApi,
    onSuccess: (data) => {
      toast.success('Budget information updated');
      navigate(`/budgets/${data[0].id}`, { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateBudget, isBudgetUpdating };
}
