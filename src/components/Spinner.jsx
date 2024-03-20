function Spinner({ h = 3, w = 3 }) {
  return <span className={`spinner h-[${h}rem] w-[${w}rem]`}></span>;
}

function FullPageSpinner({ h = 3, w = 3 }) {
  return (
    <div className='h-full grid items-center justify-center'>
      <Spinner h={h} w={w} />
    </div>
  );
}

export { Spinner, FullPageSpinner };
