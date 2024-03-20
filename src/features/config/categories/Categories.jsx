import Button from '../../../components/Button';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import { FullPageSpinner } from '../../../components/Spinner';
import Category from './Category';
import useGetCategories from './useGetCategories';

function Categories() {
  const { expenseCategories, isExpenseCategoriesLoading } = useGetCategories();

  return (
    <div className='h-screen flex flex-col'>
      <div className='bg-yellow-100 rounded-[0_0_3.2rem_3.2rem]'>
        <HeaderWithBackButton title='Categories' navigateTo='/config' />
      </div>
      {isExpenseCategoriesLoading ? (
        <FullPageSpinner />
      ) : (
        <Category expenseCategories={expenseCategories} />
      )}
      <Button additionalStyles='rounded-none'>Add New Category</Button>
    </div>
  );
}

export default Categories;
