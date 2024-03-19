import { useParams } from 'react-router-dom';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';
import MoneyCard from '../../components/MoneyCard';
import Button from '../../components/Button';
import { formatCurrency } from '../../utils/helpers';

const expenses = [
  { category: 'Food', name: 'Groceries', amount: 50 },
  { category: 'Utilities', name: 'Utilities', amount: 100 },
  { category: 'Housing', name: 'Rent', amount: 1200 },
  { category: 'Food', name: 'Dining Out', amount: 80 },
  { category: 'Transportation', name: 'Transportation', amount: 50 },
];

function Budget() {
  const { id: budgetId } = useParams();

  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='bg-gradient-to-b from-[#FFF6E5] to-[#fefbf6d8] rounded-[0_0_2.5rem_2.5rem]'>
          <HeaderWithBackButton variant='black' title='Kritika - March'>
            <div className='flex justify-end gap-3'>
              <img src={editIcon} alt='edit icon' className='cursor-pointer' />
              <img
                src={deleteIcon}
                alt='delete icon'
                className='cursor-pointer'
              />
            </div>
          </HeaderWithBackButton>
          <div className='p-10 pt-0 flex items-center justify-center gap-6'>
            <MoneyCard variant='income' />
            <MoneyCard variant='expense' />
          </div>
        </div>
        <div className='flex-1 overflow-auto p-10 flex flex-col gap-4'>
          {expenses.map((exp) => (
            <div
              key={exp.name}
              className='grid grid-cols-[minmax(12rem,1fr)_8rem_6rem] items-center gap-4 p-4 bg-gradient-to-r from-light-20 to-light-100 rounded-2xl'
            >
              <div>
                <p className='font-medium'>{exp.name}</p>
                <p className='text-extra-tiny text-dark-25/80 italic'>
                  {exp.category}
                </p>
              </div>
              <p className='font-semibold'>{formatCurrency(exp.amount)}</p>
              <div className='flex items-center gap-2'>
                <img src={editIcon} alt='edit icon' height='20' width='20' />
                <img
                  src={deleteIcon}
                  alt='delete icon'
                  height='20'
                  width='20'
                />
              </div>
            </div>
          ))}
        </div>

        <Button additionalStyles={'rounded-none'}>Add Expense</Button>
      </div>
    </>
  );
}

export default Budget;
