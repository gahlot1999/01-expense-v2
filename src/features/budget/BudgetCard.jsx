import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/helpers';

function BudgetCard({ budgets }) {
  const navigate = useNavigate();

  function handleBudgetClick(budgetId) {
    navigate(`/budget/${budgetId}`);
  }

  return (
    <>
      {budgets.map((budget) => (
        <div
          key={budget.id}
          className='flex flex-col cursor-pointer'
          onClick={() => handleBudgetClick(budget.id)}
        >
          <div className='border border-dark-25/30 rounded-[1rem_0_1rem_0] flex items-center justify-between gap-4 p-4 relative'>
            <div>
              <p className='text-dark-100 font-semibold text-small'>
                {budget.budgetName}
              </p>
              <p className='break-all text-dark-50 text-extra-tiny'>
                {budget.budgetDescription || `${budget.budgetName} budget`}
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <p className='bg-green-100 p-[.4rem_1rem] rounded-lg text-extra-tiny font-semibold text-light-100'>
                {formatCurrency(budget.budgetAmount)}
              </p>
              <p className='bg-red-100 p-[.4rem_1rem] rounded-lg text-extra-tiny font-semibold text-light-100'>
                {formatCurrency(budget.balanceBudget)}
              </p>
            </div>
          </div>
          <p className='ml-auto text-extra-tiny text-dark-50/60 italic'>
            Budget Month:{' '}
            <span className='font-semibold'>{budget.budgetMonth}</span>
          </p>
        </div>
      ))}
    </>
  );
}

export default BudgetCard;
