function Spinner() {
  return <span className='spinner h-[3rem] w-[3rem]'></span>;
}

function FullPageSpinner() {
  return (
    <div className='h-full grid items-center justify-center'>
      <span className='spinner h-[3rem] w-[3rem]'></span>
    </div>
  );
}

function ButtonSpinner() {
  return (
    <div className='h-full grid items-center justify-center'>
      <span className='spinner h-[2rem] w-[2rem]'></span>
    </div>
  );
}

export { Spinner, FullPageSpinner, ButtonSpinner };
