import { useForm } from 'react-hook-form';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import Label from '../components/Label';
import Input from '../components/Input';

function CreateBudget() {
  const { register, handleSubmit } = useForm();

  function submitForm(data) {
    console.log(data);
  }

  return (
    <div className='bg-blue-100 h-screen text-light-100 flex flex-col'>
      <div className='h-[22rem] p-10 flex flex-col justify-between'>
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
      <div className='bg-light-100 text-dark-100 flex-1 overflow-y-auto p-10 rounded-tl-[3.2rem] rounded-tr-[3.2rem]'>
        <form onSubmit={handleSubmit(submitForm)}>
          <Input placeholder='Amount' type='number' inputMode='numeric' />
          <Input placeholder='Description' />
        </form>
      </div>
    </div>
  );
}

export default CreateBudget;
