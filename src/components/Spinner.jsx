function Spinner() {
  return <span className='spinner'></span>;
}

function FullPageSpinner() {
  return (
    <div className='h-full grid items-center justify-center'>
      <Spinner />
    </div>
  );
}

export { Spinner, FullPageSpinner };
