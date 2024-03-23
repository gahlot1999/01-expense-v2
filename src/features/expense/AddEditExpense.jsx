import { useForm } from 'react-hook-form';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import Input from '../../components/Input';
import { useLocation, useParams } from 'react-router-dom';
import useAddExpense from './useAddExpense';
import { FullPageSpinner } from '../../components/Spinner';
import useEditExpense from './useEditExpense';
import useGetCategories from '../config/categories/useGetCategories';
import AddEditExpenseForm from './AddEditExpenseForm';
import useUserId from '../../hooks/useUserId';

function AddEditExpense() {
  const uid = useUserId();
  const { expenseCategories, isExpenseCategoriesLoading } =
    useGetCategories(uid);
  const { id: budgetId } = useParams();
  const location = useLocation();
  const budgetName = location.state?.budgetName;
  const toBeEditedExpenseInfo = location.state?.expenseInfo;
  const inEditMode = location.pathname.includes('/editexpense');

  const formValues = inEditMode
    ? {
        expenseName: toBeEditedExpenseInfo.expenseName,
        expenseAmount: toBeEditedExpenseInfo.expenseAmount.toString(),
        expenseCategory: toBeEditedExpenseInfo.expenseCategory,
      }
    : {
        expenseName: '',
        expenseAmount: null,
        expenseCategory: '',
      };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({ values: formValues });

  const { addExpense, expenseAddingStatus } = useAddExpense(reset);
  const { editExpense, isExpenseEditing } = useEditExpense();
  const isProcessing =
    expenseAddingStatus === 'pending' || isExpenseEditing === 'pending';

  function submitForm(data) {
    if (inEditMode) {
      const updatedExpenseObj = {
        ...data,
        budgetId: Number(budgetId),
        id: toBeEditedExpenseInfo.id,
      };
      editExpense(updatedExpenseObj);
      return;
    }
    const newExpenseObj = { uid, budgetId, ...data };
    addExpense(newExpenseObj);
  }

  return (
    <div className='bg-red-100 h-screen flex flex-col'>
      <div className='h-[30rem] flex-1 flex flex-col justify-between'>
        <HeaderWithBackButton
          title={`${inEditMode ? 'Edit Expense' : 'Add Expense'}`}
        />
        <Input
          variant='hero'
          errors={errors}
          value={budgetName}
          style={{ padding: '2.5rem' }}
          readOnly
        />
      </div>
      <div className='bg-light-100 overflow-y-auto p-10 rounded-[3.2rem_3.2rem_0_0]'>
        {isExpenseCategoriesLoading ? (
          <div className='h-[50vh]'>
            <FullPageSpinner />
          </div>
        ) : (
          <AddEditExpenseForm
            register={register}
            errors={errors}
            isProcessing={isProcessing}
            handleSubmit={handleSubmit}
            submitForm={submitForm}
            inEditMode={inEditMode}
            isDirty={isDirty}
            expenseCategories={expenseCategories}
          />
        )}
      </div>
    </div>
  );
}

export default AddEditExpense;
