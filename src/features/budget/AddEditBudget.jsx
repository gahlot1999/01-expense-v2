import { useForm } from 'react-hook-form';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Label from '../../components/Label';
import useAddBudget from './useAddBudget';
import useUpdateBudget from './useUpdateBudget';
import { useLocation } from 'react-router-dom';
import { ButtonSpinner } from '../../components/Spinner';
import useUserId from '../../hooks/useUserId';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddEditBudget() {
  const [startDate, setStartDate] = useState('');
  const uid = useUserId();
  const location = useLocation();
  const inEditMode = location.pathname === '/editbudget';
  const toBeEditedBudgetInfo = location.state?.budget;
  const expenses = location.state?.expenses;

  const formValues = toBeEditedBudgetInfo
    ? {
        budgetName: toBeEditedBudgetInfo.budgetName,
        budgetAmount: toBeEditedBudgetInfo.budgetAmount.toString(),
        budgetDescription: toBeEditedBudgetInfo.budgetDescription,
        budgetMonth: toBeEditedBudgetInfo.budgetMonth,
      }
    : {
        budgetName: '',
        budgetAmount: null,
        budgetDescription: '',
        budgetMonth: '',
      };

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
    const budgetObj = [
      {
        uid,
        budgetName: data.budgetName,
        budgetAmount: data.budgetAmount,
        budgetDescription: data.budgetDescription,
        budgetMonth: data.budgetMonth,
        balanceBudget: inEditMode
          ? data.budgetAmount -
            expenses?.reduce((accumulator, currentExpense) => {
              return accumulator + currentExpense.expenseAmount;
            }, 0)
          : data.budgetAmount,
      },
    ];

    inEditMode
      ? updateBudget({ ...budgetObj[0], id: toBeEditedBudgetInfo.id })
      : createBudget(budgetObj);
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='bg-blue-100 h-screen flex flex-col'
    >
      <div className='flex-1 flex flex-col justify-between'>
        <HeaderWithBackButton
          title={`${inEditMode ? 'Edit Budget' : 'Add Budget'}`}
        />
        <Input
          {...register('budgetName', { required: true })}
          errors={errors}
          placeholder='Budget Name...'
          variant='hero'
          disabled={isProcessing}
          style={{ padding: '1rem 2rem' }}
        />
      </div>
      <div className='bg-light-100 overflow-y-auto p-10 rounded-[3.2rem_3.2rem_0_0]'>
        <div className='flex flex-col gap-6'>
          <div>
            <Label variant='form'>Budget Month</Label>
            {/* <Input
              {...register('budgetMonth', { required: true })}
              type='month'
              min={inEditMode ? null : getCurrentMonthYear()}
              errors={errors}
              disabled={isProcessing}
            /> */}

            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showMonthYearPicker
            />
          </div>
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

          <div className='flex items-center justify-between'>
            <div className='space-x-2'>
              <input
                type='checkbox'
                id='emi'
                className='align-middle mb-[.3rem]'
              />
              <Label variant='form-checkbox' htmlFor='emi'>
                Add EMI?
              </Label>
            </div>
            <div className='space-x-2'>
              <input
                type='checkbox'
                id='defaultExpenses'
                className='align-middle mb-[.3rem]'
              />
              <Label variant='form-checkbox' htmlFor='defaultExpenses'>
                Add Default Expenses?
              </Label>
            </div>
          </div>

          <Button type='submit' disabled={isProcessing || !isDirty}>
            {isProcessing ? <ButtonSpinner /> : inEditMode ? 'Edit' : 'Add'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddEditBudget;
