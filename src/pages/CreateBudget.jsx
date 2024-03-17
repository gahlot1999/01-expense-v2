import HeaderWithBackButton from '../components/HeaderWithBackButton';

function CreateBudget() {
  return (
    <div className='bg-blue-100 h-screen text-light-100 flex flex-col'>
      <div className='h-[22rem] pt-10'>
        <HeaderWithBackButton title='Add Budget' />
        <div>
          <p>Name</p>
          <input type='text' />
        </div>
      </div>
      <div className='bg-light-100 text-dark-100 flex-1 overflow-y-auto p-10 rounded-tl-[3.2rem] rounded-tr-[3.2rem]'>
        Hello
      </div>
    </div>
  );
}

export default CreateBudget;
