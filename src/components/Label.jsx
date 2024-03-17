function Label({ variant = 'form', children, htmlFor }) {
  const baseStyles = '';
  let activeStyles = '';

  switch (variant) {
    case 'big':
      activeStyles = 'text-title-sm font-semibold text-light-80/60';
      break;

    default:
      break;
  }
  return (
    <label className={`${baseStyles} ${activeStyles}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
