import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { variant = 'form', type = 'text', placeholder, ...props },
  ref,
) {
  const baseStyles = 'w-full';
  let activeStyles = '';

  switch (variant) {
    case 'hero':
      activeStyles = 'bg-[transparent] text-title-lg font-semibold';
      break;

    case 'form':
      activeStyles =
        'text-regular-lg text-dark-50 border-[.1rem] border-light-20 border-solid p-[.8rem_1rem] rounded-2xl';
      break;

    default:
      break;
  }

  return (
    <input
      ref={ref}
      className={`${baseStyles} ${activeStyles}`}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
