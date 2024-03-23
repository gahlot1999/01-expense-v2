function Quote({ quote }) {
  return (
    <div className='before:content-[open-quote] before:font-serif before:font-black before:absolute before:top-[-10rem] before:left-[-0.5rem] before:z-[-1] before:text-[25rem] before:text-violet-40'>
      <p
        className={`leading-snug text-center p-16 pb-0 font-bold text-dark-50 ${
          quote?.length > 80 ? 'text-title-md' : 'text-title-lg'
        }`}
      >
        {quote}
      </p>
    </div>
  );
}

export default Quote;
