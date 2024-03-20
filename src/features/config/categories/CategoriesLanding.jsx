import deleteIcon from '../../../assets/trash.svg';
import Button from '../../../components/Button';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import { FullPageSpinner } from '../../../components/Spinner';
import useGetCategories from './useGetCategories';

function CategoriesLanding() {
  const { expenseCategories, isExpenseCategoriesLoading } = useGetCategories();

  return (
    <div className='h-screen flex flex-col'>
      <div className='bg-yellow-100 rounded-[0_0_3.2rem_3.2rem]'>
        <HeaderWithBackButton title='Categories' navigateTo='/config' />
      </div>
      {isExpenseCategoriesLoading ? (
        <FullPageSpinner />
      ) : (
        <div className='p-10 flex-1 flex flex-col gap-4'>
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
                  className='cursor-pointer'
                  height='20'
                  width='20'
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <Button additionalStyles='rounded-none'>Add New Category</Button>
    </div>
  );
}

export default CategoriesLanding;
