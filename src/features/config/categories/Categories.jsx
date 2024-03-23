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
import Message from '../../../components/Message';

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

      <div className='p-10 flex-1 overflow-y-auto flex flex-col gap-4'>
        {isExpenseCategoriesLoading ? (
          <FullPageSpinner />
        ) : expenseCategories.length === 0 ? (
          <Message>
            You have no categories. Tap on{' '}
            <span className='font-bold'>Add New Category</span> to get started.
          </Message>
        ) : (
          <Category expenseCategories={expenseCategories} />
        )}
      </div>

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
