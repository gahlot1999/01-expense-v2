import HeaderWithBackButton from '../components/HeaderWithBackButton';

function CreateBudget() {
  return (
    <div className='bg-blue-100 h-screen text-light-100 flex flex-col'>
      <div className='h-[22rem] p-10 flex flex-col justify-between'>
        <HeaderWithBackButton title='Add Budget' />
        <div>
          <label
            htmlFor='name'
            className='text-title-sm font-semibold text-light-80/60'
          >
            Budget Name
          </label>
          <input
            type='text'
            id='name'
            className='w-full bg-transparent text-title-lg font-semibold'
            placeholder='Typing...'
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
