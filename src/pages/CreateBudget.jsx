import HeaderWithBackButton from '../components/HeaderWithBackButton';
import Label from '../components/Label';

function CreateBudget() {
  return (
    <div className='bg-blue-100 h-screen text-light-100 flex flex-col'>
      <div className='h-[22rem] p-10 flex flex-col justify-between'>
        <HeaderWithBackButton title='Add Budget' />
        <div>
          <Label variant='big' htmlFor='name'>
            Budget Name
          </Label>
          <input
            type='text'
            id='name'
            className='w-full bg-[transparent] text-title-lg font-semibold'
            placeholder='Start typing...'
            autoComplete='off'
          />
        </div>
      </div>
      <div className='bg-light-100 text-dark-100 flex-1 overflow-y-auto p-10 rounded-tl-[3.2rem] rounded-tr-[3.2rem]'>
        Hello
      </div>
    </div>
  );
}

export default CreateBudget;
