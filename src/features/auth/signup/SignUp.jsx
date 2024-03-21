import { useForm } from 'react-hook-form';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { ButtonSpinner } from '../../../components/Spinner';
import { Link } from 'react-router-dom';
import useSignUp from './useSignUp';

function SignUp() {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    values: { firstName: '', lastName: '', email: '', password: '' },
  });

  const { isUserSigningUp, signUp } = useSignUp();

  function handleSignUp(user) {
    signUp(user);
  }

  return (
    <>
      <HeaderWithBackButton backBtn={false} variant='black' title='Signup' />
      <div className='p-10 text-center'>
        <form className='space-y-8' onSubmit={handleSubmit(handleSignUp)}>
          <Input
            placeholder='First name'
            errors={errors}
            disabled={isUserSigningUp}
            {...register('firstName', { required: true })}
          />
          <Input
            placeholder='Last name'
            errors={errors}
            disabled={isUserSigningUp}
            {...register('lastName', { required: true })}
          />
          <Input
            placeholder='Email'
            type='email'
            errors={errors}
            disabled={isUserSigningUp}
            {...register('email', { required: true })}
          />
          <Input
            placeholder='Password'
            type='password'
            errors={errors}
            disabled={isUserSigningUp}
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'Password must be 6 characters long',
              },
            })}
          />
          <div className='pt-4 flex flex-col gap-4'>
            <Button disabled={isUserSigningUp || !isDirty}>
              {isUserSigningUp ? <ButtonSpinner /> : 'Sign Up'}
            </Button>
          </div>
        </form>
        <p className='mt-4 text-dark-75/60 font-semibold'>
          Already have an account?{' '}
          <Link
            to='/login'
            replace={true}
            className='text-violet-100 underline'
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
