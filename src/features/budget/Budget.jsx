import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';
import MoneyCard from '../../components/MoneyCard';
import Button from '../../components/Button';
import useGetExpenses from '../../hooks/useGetExpenses';
import ExpenseItem from '../expense/ExpenseItem';
import { FullPageSpinner } from '../../components/Spinner';

function Budget() {
  const navigate = useNavigate();
  const location = useLocation();
  const budgetInfo = location.state.budgetInfo;
  const { id } = useParams();

  const { expenses, isExpensesLoading } = useGetExpenses(id);
  const expenseAmount =
    budgetInfo.budgetAmount -
    expenses?.reduce((total, expense) => total + expense.expenseAmount, 0);

  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='bg-gradient-to-b from-[#FFF6E5] to-[#fefbf6d8] rounded-[0_0_2.5rem_2.5rem]'>
          <HeaderWithBackButton variant='black' title={budgetInfo.budgetName}>
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
            <MoneyCard variant='income' amount={budgetInfo.budgetAmount} />
            <MoneyCard variant='expense' amount={expenseAmount} />
          </div>
        </div>
        <div className='flex-1 overflow-auto p-10 flex flex-col gap-4'>
          {isExpensesLoading ? (
            <FullPageSpinner />
          ) : (
            <ExpenseItem expenses={expenses} />
          )}
        </div>

        <Button
          additionalStyles={'rounded-none'}
          onClick={() =>
            navigate('addexpense', { state: { formState: 'new' } })
          }
        >
          Add Expense
        </Button>
      </div>
    </>
  );
}

export default Budget;
