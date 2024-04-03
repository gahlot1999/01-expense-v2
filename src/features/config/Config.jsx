import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import expenseCategoryIcon from '../../assets/category.svg';
import predefinedExpensesIcon from '../../assets/expense-2.svg';
import emiIcon from '../../assets/emi.svg';

import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'Categories',
    icon: expenseCategoryIcon,
    path: '/categories',
    disabled: false,
  },
  // {
  //   title: 'Predefined',
  //   icon: predefinedExpensesIcon,
  //   path: '/predefined',
  //   disabled: true,
  // },
  {
    title: 'EMI',
    icon: emiIcon,
    path: '/emi',
    disabled: false,
  },
];

function Config() {
  const navigate = useNavigate();

  return (
    <>
      <div className='bg-yellow-100 rounded-[0_0_3.2rem_3.2rem]'>
        <HeaderWithBackButton title='Configurations' navigateTo='/home' />
      </div>
      <div className='max-w-[35rem] m-auto p-10 grid grid-cols-2 gap-12 text-center'>
        {categories.map((cat) => (
          <div
            key={cat.title}
            onClick={() => !cat.disabled && navigate(cat.path)}
            className={`w-full p-8 cursor-pointer border-[.1rem] border-solid border-yellow-60 rounded-lg shadow-sm ${
              cat.disabled && 'disabled'
            }`}
          >
            <img
              src={cat.icon}
              alt='expenseCategoryIcon'
              className='m-auto mb-3'
              height={50}
              width={50}
            />
            <p className='text-regular-sm font-semibold text-dark-75 leading-6'>
              {cat.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Config;
