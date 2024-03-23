function Button({
  variant = 'primary',
  children,
  onClick,
  additionalStyles,
  ...props
}) {
  const baseStyles = 'py-5 px-10 rounded-[1rem] font-semibold text-small';
  let activeStyles = '';

  switch (variant) {
    case 'primary':
      activeStyles = 'bg-violet-100 text-light-80';
      break;

    case 'secondary':
      activeStyles = 'bg-violet-20 text-violet-100';
      break;

    case 'addCategory':
      activeStyles =
        'bg-violet-20 text-violet-100 text-title-sm px-6 py-[.75rem]';
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
