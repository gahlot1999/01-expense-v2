import { useState } from 'react';
import deleteIcon from '../../../assets/trash.svg';
import ConfirmDelete from '../../../components/ConfirmDelete';
import useDeleteCategory from './useDeleteCategory';

function Category({ expenseCategories }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isDeleteCategoryConfirmOpen, setIsDeleteCategoryConfirmOpen] =
    useState(false);

  const { deleteCategory, isCategoryDeleting } = useDeleteCategory(
    setIsDeleteCategoryConfirmOpen,
  );
  return (
    <>
      <div className='p-10 flex-1 overflow-y-auto flex flex-col gap-4'>
        {expenseCategories.map((category) => (
          <div
            key={crypto.randomUUID()}
            className='grid grid-cols-[minmax(15rem,1fr)_4rem] items-center gap-4 p-4 bg-gradient-to-r from-yellow-20 to-light-100 rounded-2xl'
          >
            <p className='font-medium'>{category.categoryLabel}</p>

            <div className='flex items-center justify-self-end gap-2'>
              <img
                src={deleteIcon}
                alt='delete icon'
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  setIsDeleteCategoryConfirmOpen(true);
                }}
                className='cursor-pointer'
                height='20'
                width='20'
              />
            </div>
          </div>
        ))}
      </div>
      <ConfirmDelete
        isOpen={isDeleteCategoryConfirmOpen}
        onClose={() => setIsDeleteCategoryConfirmOpen(false)}
        onConfirm={() => deleteCategory(selectedCategoryId)}
        processing={isCategoryDeleting}
      />
    </>
  );
}

export default Category;
