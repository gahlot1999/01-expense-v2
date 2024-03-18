import { useForm } from 'react-hook-form';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';

function CreateBudget() {
  const { register, handleSubmit } = useForm();

  function submitForm(data) {
    console.log(data);
  }

  return (
    <div className='bg-blue-100 h-screen text-light-100 flex flex-col'>
      <div className='h-[30rem] p-10 flex-1 flex flex-col justify-between'>
        <HeaderWithBackButton title='Add Budget' />
        <div>
          <Label variant='big' htmlFor='budgetName'>
            Budget Name
          </Label>
          <Input
            {...register('budgetName', { required: true })}
            id='budgetName'
            placeholder='Start typing...'
            autoComplete='off'
            variant='hero'
          />
        </div>
      </div>
      <div className='bg-light-100 overflow-y-auto p-10 rounded-[3.2rem_3.2rem_0_0]'>
        <form
          onSubmit={handleSubmit(submitForm)}
          className='flex flex-col gap-4'
        >
          <Input placeholder='Amount' type='number' inputMode='numeric' />
          <Input placeholder='Description' />
          <Button style={{ marginTop: '1.5rem' }}>Add</Button>
        </form>
      </div>
    </div>
  );
}

export default CreateBudget;
