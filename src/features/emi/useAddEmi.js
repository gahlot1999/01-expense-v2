import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEmi as addEmiApi } from '../../services/api';
import toast from 'react-hot-toast';

export default function useAddEmi(onClose) {
  const queryClient = useQueryClient();
  const { mutate: addEmi, status: isEmiAdding } = useMutation({
    mutationFn: addEmiApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emis'] });
      toast.success('EMI added');
      onClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addEmi, isEmiAdding: isEmiAdding === 'pending' };
}
