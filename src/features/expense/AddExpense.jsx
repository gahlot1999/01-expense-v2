import { useForm, useFormContext } from 'react-hook-form';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Label from '../../components/Label';
import { useParams } from 'react-router-dom';
import useAddExpense from '../../hooks/useAddExpense';

function AddExpense() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { addExpense, expenseAddingStatus } = useAddExpense(reset);
  const isExpenseAdding = expenseAddingStatus === 'pending';

  function submitForm(data) {
    const newExpenseObj = { budgetId: id, ...data };
    addExpense(newExpenseObj);
  }

  return (
    <div className='bg-red-100 h-screen flex flex-col'>
      <div className='h-[30rem] flex-1 flex flex-col justify-between'>
        <HeaderWithBackButton title='Add Expense' />
        <Input
          variant='hero'
          // TODO: Get name from state of react router
          value='Kritika - March'
          style={{ padding: '2.5rem' }}
          readOnly
        />
      </div>
      <div className='bg-light-100 overflow-y-auto p-10 rounded-[3.2rem_3.2rem_0_0]'>
        <form
          className='flex flex-col gap-8'
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <Label variant='form'>Expense Name</Label>
            <Input
              {...register('expenseName', { required: true })}
              inputMode='numeric'
              disabled={isExpenseAdding}
            />
          </div>
          <div>
            <Label variant='form'>Expense Amount</Label>
            <Input
              {...register('expenseAmount', { required: true })}
              type='number'
              inputMode='numeric'
              disabled={isExpenseAdding}
            />
          </div>
          <div>
            <Label variant='form'>Expense Category</Label>
            <select
              {...register('expenseCategory', { required: true })}
              disabled={isExpenseAdding}
            >
              <option hidden></option>
              <option value='Lic'>Lic</option>
              <option value='Credit Card Bill'>Credit Card Bill</option>
              <option value='Rent'>Rent</option>
              <option value='Emi'>Emi</option>
            </select>
          </div>
          <Button
            type='submit'
            style={{ marginTop: '1rem' }}
            disabled={isExpenseAdding}
          >
            {isExpenseAdding ? 'Adding' : 'Add'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
