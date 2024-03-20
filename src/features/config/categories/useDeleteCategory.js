import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory as deleteCategoryApi } from '../../../services/api';
import toast from 'react-hot-toast';

export default function useDeleteCategory(setIsDeleteCategoryConfirmOpen) {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, status: isCategoryDeleting } = useMutation({
    mutationFn: deleteCategoryApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted');
    },

    onError: (err) => {
      toast.err(err.message);
    },

    onSettled: () => {
      setIsDeleteCategoryConfirmOpen(false);
    },
  });

  return { deleteCategory, isCategoryDeleting };
}
