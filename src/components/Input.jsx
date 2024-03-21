import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { variant = 'form', type = 'text', placeholder, errors = {}, ...props },
  ref,
) {
  const { name } = props;
  const baseStyles = 'w-full';
  const errorStyles = 'border-red-100';
  let activeStyles = '';

  switch (variant) {
    case 'hero':
      activeStyles = `bg-[transparent] text-title-lg font-semibold text-light-100 ${
        errors[name] && 'placeholder:text-red-100'
      }`;
      break;

    case 'form':
      activeStyles =
        'text-regular-lg text-dark-50 border-[.1rem] border-light-20 border-solid p-[.8rem_1rem] rounded-2xl mt-[.2rem]';
      break;

    default:
      break;
  }

  return (
    <div>
      <input
        ref={ref}
        className={`
        ${baseStyles} 
        ${activeStyles} 
        ${errors[name] && errorStyles}
        `}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        {...props}
      />
      <p className='mt-2 text-left text-red-100 font-medium'>
        {errors[name] && errors[name].message && errors[name].message}
      </p>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
