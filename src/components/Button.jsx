function Button({ variant = 'primary', children, onClick, ...props }) {
  const baseStyles = 'py-5 rounded-[1.6rem]';
  let activeStyles = '';

  switch (variant) {
    case 'primary':
      activeStyles = 'bg-violet-100 text-light-80';
      break;

    case 'secondary':
      activeStyles = 'bg-violet-20 text-violet-100';
      break;

    default:
      break;
  }

  return (
    <button
      className={`${baseStyles} ${activeStyles}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
