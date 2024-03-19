import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBudget as deleteBudgetApi } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useDeleteBudget(setIsConfirmDeleteModalOpen) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBudget, status: isBudgetDeleting } = useMutation({
    mutationFn: deleteBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Budget deleted');
      setIsConfirmDeleteModalOpen(false);
      navigate(-1, { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteBudget, isBudgetDeleting };
}
