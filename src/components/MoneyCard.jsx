import { capitalizeFirstLetter, formatCurrency } from '../utils/helpers';
import incomeIcon from '../assets/income.png';
import expenseIcon from '../assets/expense.png';

function MoneyCard({ variant }) {
  const isIncome = variant === 'income';
  return (
    <div
      className={`
      flex items-center gap-4 p-7 rounded-[2.4rem]
      ${isIncome ? 'bg-green-100' : 'bg-red-100'}
      `}
    >
      <div className='bg-light-100 p-2 rounded-[1.4rem]'>
        <img src={isIncome ? incomeIcon : expenseIcon} alt='income' />
      </div>
      <div>
        <p className='text-regular-sm text-light-80'>
          {capitalizeFirstLetter(variant)}
        </p>
        <p className='text-regular-lg text-light-100 font-bold'>
          {formatCurrency(43000)}
        </p>
      </div>
    </div>
  );
}

export default MoneyCard;
