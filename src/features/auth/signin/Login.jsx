import { Link, useLocation } from 'react-router-dom';
import Button from '../../../components/Button';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form';
import useLogin from './useLogin';
import { ButtonSpinner } from '../../../components/Spinner';

function Login() {
  const location = useLocation();
  const email = location.state?.email;
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    values: { email: email ?? '', password: '' },
  });

  const { login, isUserLoggingIn } = useLogin();

  function handleLogin(user) {
    login(user);
  }

  return (
    <>
      <HeaderWithBackButton backBtn={false} variant='black' title='Login' />
      <div className='p-10 text-center'>
        <form className='space-y-8' onSubmit={handleSubmit(handleLogin)}>
          <Input
            placeholder='Email'
            type='email'
            errors={errors}
            disabled={isUserLoggingIn}
            {...register('email', { required: true })}
          />
          <Input
            placeholder='Password'
            type='password'
            errors={errors}
            disabled={isUserLoggingIn}
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'Password must be 6 characters long',
              },
            })}
          />
          <div className='pt-4 flex flex-col gap-4'>
            <Button disabled={isUserLoggingIn || !isDirty}>
              {isUserLoggingIn ? <ButtonSpinner /> : 'Login'}
            </Button>
            <Button variant='secondary' disabled={isUserLoggingIn || true}>
              Forgot Password?
            </Button>
          </div>
        </form>
        <p className='mt-4 text-dark-75/60 font-semibold'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            replace={true}
            className='text-violet-100 underline'
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
