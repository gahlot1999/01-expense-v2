import { useForm } from 'react-hook-form';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Label from '../../components/Label';
import useAddBudget from '../../hooks/useAddBudget';
import useUpdateBudget from '../../hooks/useUpdateBudget';
import { useLocation } from 'react-router-dom';
import { ButtonSpinner } from '../../components/Spinner';

function AddEditBudget() {
  const location = useLocation();
  const inEditMode = location.pathname === '/editbudget';
  const toBeEditedBudgetInfo = location.state?.budget;

  const formValues = toBeEditedBudgetInfo
    ? {
        budgetName: toBeEditedBudgetInfo.budgetName,
        budgetAmount: toBeEditedBudgetInfo.budgetAmount.toString(),
        budgetDescription: toBeEditedBudgetInfo.budgetDescription,
      }
    : { budgetName: '', budgetAmount: null, budgetDescription: '' };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    values: formValues,
  });

  const { createBudget, isBudgetAdding } = useAddBudget(reset);
  const { updateBudget, isBudgetUpdating } = useUpdateBudget();

  const isProcessing =
    isBudgetAdding === 'pending' || isBudgetUpdating === 'pending';

  function submitForm(data) {
    const newBudgetObj = [
      {
        budgetName: data.budgetName,
        budgetAmount: data.budgetAmount,
        budgetDescription: data.budgetDescription,
      },
    ];

    inEditMode
      ? updateBudget({ ...newBudgetObj[0], id: toBeEditedBudgetInfo.id })
      : createBudget(newBudgetObj);
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='bg-blue-100 h-screen flex flex-col'
    >
      <div className='h-[30rem] flex-1 flex flex-col justify-between'>
        <HeaderWithBackButton
          title={`${inEditMode ? 'Edit Budget' : 'Add Budget'}`}
        />
        <Input
          {...register('budgetName', { required: true })}
          errors={errors}
          placeholder='Budget Name...'
          variant='hero'
          disabled={isProcessing}
          style={{ padding: '2.5rem' }}
        />
      </div>
      <div className='bg-light-100 overflow-y-auto p-10 rounded-[3.2rem_3.2rem_0_0]'>
        <div className='flex flex-col gap-8'>
          <div>
            <Label variant='form'>Budget Amount</Label>
            <Input
              {...register('budgetAmount', { required: true })}
              errors={errors}
              type='number'
              inputMode='numeric'
              disabled={isProcessing}
            />
          </div>
          <div>
            <Label variant='form'>Budget Description</Label>
            <Input
              {...register('budgetDescription')}
              errors={errors}
              disabled={isProcessing}
            />
          </div>
          <Button
            type='submit'
            style={{ marginTop: '1rem' }}
            disabled={isProcessing || !isDirty}
          >
            {isProcessing ? <ButtonSpinner /> : inEditMode ? 'Edit' : 'Add'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddEditBudget;
