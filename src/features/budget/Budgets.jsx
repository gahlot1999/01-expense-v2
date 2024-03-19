import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import BudgetCard from './BudgetCard';
import Message from '../../components/Message';
import { FullPageSpinner } from '../../components/Spinner';
import useGetBudgets from '../../hooks/useGetBudgets';

function Budgets() {
  const navigate = useNavigate();
  const { budgets, isBudgetsLoading } = useGetBudgets();

  return (
    <div className='bg-violet-100 h-screen flex flex-col'>
      <HeaderWithBackButton title='Budgets' />

      <div className='bg-light-100 rounded-[3.2rem_3.2rem_0_0] p-10 flex-1 overflow-y-auto flex flex-col gap-8'>
        {isBudgetsLoading && <FullPageSpinner />}

        {budgets && budgets.length > 0 && <BudgetCard budgets={budgets} />}

        {budgets && budgets.length === 0 && (
          <div className='h-full grid items-center text-center'>
            <Message>
              You have no budgets. Tap on{' '}
              <span className='font-bold'>Add new budget</span> to get started.
            </Message>
          </div>
        )}
      </div>

      <Button onClick={() => navigate('/createbudget')}>Add new budget</Button>
    </div>
  );
}

export default Budgets;
