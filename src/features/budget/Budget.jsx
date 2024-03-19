import { formatCurrency, formatDate } from '../../utils/helpers';

function Budget({ budgets }) {
  return (
    <>
      {budgets.map((budget) => (
        <div key={budget.id} className='flex flex-col'>
          <div className='border border-dark-25/30 rounded-[1rem_0_1rem_0] flex items-center justify-between gap-4 p-4 relative'>
            <div>
              <p className='text-dark-100 font-semibold text-small'>
                {budget.budgetName}
              </p>
              <p className='break-all text-dark-50 text-extra-tiny'>
                {budget.budgetDescription || `${budget.budgetName} budget`}
              </p>
            </div>
            <p className='bg-green-100 p-[.4rem_1rem] rounded-lg text-extra-tiny font-semibold text-light-100'>
              {formatCurrency(budget.budgetAmount)}
            </p>
          </div>

          <p className='block ml-auto text-extra-tiny text-dark-50/60 italic'>
            {formatDate(budget.created_at)}
          </p>
        </div>
      ))}
    </>
  );
}

export default Budget;
