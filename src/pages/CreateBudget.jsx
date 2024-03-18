import { useForm } from 'react-hook-form';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import { createbudget } from '../services/api';
import { useState } from 'react';

function CreateBudget() {
  const { register, handleSubmit, reset } = useForm();
  const [isBudgetAdding, setIsBudgetAdding] = useState(false);

  async function submitForm(data) {
    const newBudget = [
      {
        budgetName: data.budgetName,
        budgetAmount: data.budgetAmount,
        budgetDescription: data.budgetDescription,
      },
    ];

    try {
      setIsBudgetAdding(true);
      await createbudget(newBudget);
      reset();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsBudgetAdding(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='bg-blue-100 h-screen flex flex-col'
    >
      <div className='h-[30rem] p-10 flex-1 flex flex-col justify-between'>
        <HeaderWithBackButton title='Add Budget' />
        <Input
          {...register('budgetName', { required: true })}
          id='budgetName'
          placeholder='Budget Name'
          variant='hero'
          autoFocus={true}
          disabled={isBudgetAdding}
        />
      </div>
      <div className='bg-light-100 overflow-y-auto p-10 rounded-[3.2rem_3.2rem_0_0]'>
        <div className='flex flex-col gap-4'>
          <Input
            {...register('budgetAmount', { required: true })}
            placeholder='Amount'
            type='number'
            inputMode='numeric'
            disabled={isBudgetAdding}
          />
          <Input
            {...register('budgetDescription')}
            placeholder='Description'
            disabled={isBudgetAdding}
          />
          <Button
            type='submit'
            style={{ marginTop: '1.5rem' }}
            disabled={isBudgetAdding}
          >
            {isBudgetAdding ? 'Adding' : 'Add'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateBudget;
