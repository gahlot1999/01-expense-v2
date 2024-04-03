import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmi as updateEmiApi } from '../../services/api';
import toast from 'react-hot-toast';

export default function useUpdateEmi(onClose) {
  const queryClient = useQueryClient();
  const { mutate: updateEmi, status: isEmiUpdating } = useMutation({
    mutationFn: updateEmiApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emis'] });
      onClose();
      toast.success('EMI Updated');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateEmi, isEmiUpdating: isEmiUpdating === 'pending' };
}
