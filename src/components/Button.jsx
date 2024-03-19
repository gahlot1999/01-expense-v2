function Button({
  variant = 'primary',
  children,
  onClick,
  additionalStyles,
  ...props
}) {
  const baseStyles = 'py-5 rounded-[1rem] font-semibold text-small';
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
      className={`${baseStyles} ${activeStyles} ${additionalStyles}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
