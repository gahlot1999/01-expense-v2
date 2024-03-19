import React from 'react';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import { formatCurrency, formatDate } from '../utils/helpers';
import Button from '../components/Button';

const dummyBudgetsData = [
  {
    id: 22,
    created_at: '2024-03-18T14:25:21.407814+00:00',
    budgetName: 'Kritika - March',
    budgetAmount: 63000,
    budgetDescription: 'Extra income this month',
  },
  {
    id: 34,
    created_at: '2024-03-19T05:52:29.416673+00:00',
    budgetName: 'Ashish - March',
    budgetAmount: 40000,
    budgetDescription: "Ashish's march budget",
  },
];

function Budgets() {
  return (
    <div className='bg-violet-100 h-screen flex flex-col'>
      <HeaderWithBackButton title='Budgets' />
      <div className='bg-light-100 rounded-[3.2rem_3.2rem_0_0] p-10 flex-1 overflow-y-auto flex flex-col gap-8'>
        {dummyBudgetsData.map((budget) => (
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
      </div>
      <Button>Add new budget</Button>
    </div>
  );
}

export default Budgets;
