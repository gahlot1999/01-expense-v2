import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory as addCategoryApi } from '../../../services/api';
import toast from 'react-hot-toast';

export default function useAddCategory(setIsAddCategoryModalOpen, reset) {
  const queryClient = useQueryClient();
  const { mutate: addCategory, status: isCategoryAdding } = useMutation({
    mutationFn: addCategoryApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category Added');
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSettled: () => {
      setIsAddCategoryModalOpen(false);
    },
  });

  return { addCategory, isCategoryAdding };
}
