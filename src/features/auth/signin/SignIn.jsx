import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import Input from '../../../components/Input';

function SignIn() {
  return (
    <>
      <HeaderWithBackButton variant='black' title='Login' />
      <div className='p-10 text-center'>
        <form className='space-y-8'>
          <Input placeholder='Email' type='email' />
          <Input placeholder='Password' type='password' />
          <div className='pt-4 flex flex-col gap-4'>
            <Button>Login</Button>
            <Button variant='secondary'>Forgot Password?</Button>
          </div>
        </form>
        <p className='mt-4 text-dark-75/60'>
          Don&apos;t have an account yet?{' '}
          <Link className='text-violet-100 underline'>Sign Up</Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
