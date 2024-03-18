function Label({ variant = 'form', children, mandatory = false, ...props }) {
  const baseStyles = '';
  const mandatoryStyles = `after:content-['*'] after:ml-[.2rem] after:text-red-60`;
  let activeStyles = '';

  switch (variant) {
    case 'big':
      activeStyles = 'text-title-sm font-semibold text-light-80/60';
      break;

    case 'form':
      activeStyles = 'text-tiny text-dark-25';
      break;

    default:
      break;
  }
  return (
    <label
      className={`
        ${baseStyles} 
        ${activeStyles} 
        ${mandatory && mandatoryStyles}
        
      `}
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;
