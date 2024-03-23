import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form';
import useLogin from './useLogin';
import { ButtonSpinner } from '../../../components/Spinner';
import Quote from '../../../components/Quote';
import { useUser } from '../useUser';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const moneyQuotes = [
  'A budget tells money where to go, not where it went.',
  'Money looks better in the bank than on your feet.',
  "It's not your salary that makes you rich; it's your spending habits.",
  'The art is not in making money but in keeping it.',
  'The habit of saving is an education in itself.',
  'A budget embodies our values and aspirations.',
  'Every cent you own is an investment.',
  "Show me where you spend, I'll tell you your priorities.",
  'Money is a tool, not the driver.',
  'Beware of little expenses; they sink great ships.',
  "It's not how much you make, but how much you keep.",
  'Becoming a millionaire shapes your character.',
  'Control money like emotions to stay on track.',
  "Invest in yourself; it's never out of style.",
  "Spend what's left after saving, not vice versa.",
  'Learn more to earn more.',
  'Saving teaches virtues and broadens the mind.',
  'Wealth comes from saving as well as getting.',
  'Self-education leads to financial fortune.',
  'Financial peace is living on less and giving back.',
  'Wealth consists not in having great possessions, but in having few wants.',
  'Do not save what is left after spending, but spend what is left after saving.',
  'Wealth is the ability to fully experience life.',
  "Every time you borrow money, you're robbing your future self.",
  'It is not the man who has too little, but the man who craves more, that is poor.',
  'A wise person should have money in their head, but not in their heart.',
  "Don't stay in bed, unless you can make money in bed.",
  'Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas.',
  'When I was young I thought that money was the most important thing in life; now that I am old I know that it is.',
  'The safe way to double your money is to fold it over once and put it in your pocket.',
  'Money often costs too much.',
  'Money is better than poverty, if only for financial reasons.',
  'A bank is a place where they lend you an umbrella in fair weather and ask for it back when it starts to rain.',
  'Opportunity is missed by most people because it is dressed in overalls and looks like work.',
  "Money won't create success, the freedom to make it will.",
  "Don't let making a living prevent you from making a life.",
  "Too many people spend money they haven't earned to buy things they don't want to impress people they don't like.",
  'A penny saved is a penny earned.',
  "It's not the employer who pays the wages. Employers only handle the money. It's the customer who pays the wages.",
  "Money is multiplied in practical value depending on the number of W's you control in your life: what you do, when you do it, where you do it, and with whom you do it.",
  "Money can't buy happiness, but it will certainly get you a better class of memories.",
  'The best way to teach your kids about taxes is by eating 30% of their ice cream.',
  'Rule No. 1: Never lose money. Rule No. 2: Never forget Rule No. 1.',
  'Money is like manure. You have to spread it around or it smells.',
  'There are people who have money and people who are rich.',
];

function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [randomQuoteIndex] = useState(Math.floor(Math.random() * 44) + 1);

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

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='h-screen flex flex-col'>
      <Quote quote={moneyQuotes[randomQuoteIndex]} />
      <div className='flex-1 bg-violet-20 grid content-center p-10 text-center'>
        <form className='space-y-4 w-full' onSubmit={handleSubmit(handleLogin)}>
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
        <p className='text-dark-75/60 font-semibold'>
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
    </div>
  );
}

export default Login;
