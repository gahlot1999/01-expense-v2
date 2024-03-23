import { useState } from 'react';
import Button from '../../../components/Button';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import { FullPageSpinner } from '../../../components/Spinner';
import AddCategoryForm from './AddCategoryForm';
import Category from './Category';
import useGetCategories from './useGetCategories';
import useAddCategory from './useAddCategory';
import { useForm } from 'react-hook-form';
import useUserId from '../../../hooks/useUserId';

function Categories() {
  const uid = useUserId();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({ values: { categoryName: '' } });

  const { expenseCategories, isExpenseCategoriesLoading } =
    useGetCategories(uid);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const { addCategory, isCategoryAdding } = useAddCategory(
    setIsAddCategoryModalOpen,
    reset,
  );

  return (
    <div className='h-screen flex flex-col'>
      <div className='bg-yellow-100 rounded-[0_0_3.2rem_3.2rem]'>
        <HeaderWithBackButton title='Categories' />
      </div>
      {isExpenseCategoriesLoading ? (
        <FullPageSpinner />
      ) : (
        <Category expenseCategories={expenseCategories} />
      )}
      <Button
        additionalStyles='rounded-none'
        onClick={() => setIsAddCategoryModalOpen(true)}
      >
        Add New Category
      </Button>

      <AddCategoryForm
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        processing={isCategoryAdding}
        onConfirm={addCategory}
        register={register}
        errors={errors}
        isDirty={isDirty}
        handleSubmit={handleSubmit}
        reset={reset}
      />
    </div>
  );
}

export default Categories;
