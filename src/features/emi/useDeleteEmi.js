import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmi as deleteEmiApi } from '../../services/api';
import toast from 'react-hot-toast';

export default function useDeleteEmi(setIsDeleteEmiModalOpen) {
  const queryClient = useQueryClient();
  const { mutate: deleteEmi, status: isEmiDeleting } = useMutation({
    mutationFn: deleteEmiApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emis'] });
      setIsDeleteEmiModalOpen(false);
      toast.success('EMI Deleted');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteEmi, isEmiDeleting };
}
