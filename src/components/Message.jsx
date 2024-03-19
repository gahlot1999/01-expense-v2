function Message({ children }) {
  return (
    <div className='h-full grid items-center text-center'>
      <p className='text-title-sm text-dark-75'>{children}</p>
    </div>
  );
}

export default Message;
