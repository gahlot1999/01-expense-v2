import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import expenseCategoryIcon from '../../assets/category.svg';
import predefinedExpensesIcon from '../../assets/expense-2.svg';

const categories = [
  {
    title: 'Categories',
    icon: expenseCategoryIcon,
  },
  { title: 'Predefined', icon: predefinedExpensesIcon },
];

function Config() {
  return (
    <>
      <div className='bg-yellow-100 rounded-[0_0_3.2rem_3.2rem]'>
        <HeaderWithBackButton title='Configurations' />
      </div>
      <div className='mt-4 p-10 grid grid-cols-2 gap-4 justify-items-center items-center text-center'>
        {categories.map((cat) => (
          <div
            key={cat.title}
            className='p-8 border-[.1rem] border-solid border-yellow-60 rounded-lg shadow-sm'
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
