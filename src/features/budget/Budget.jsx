import { useNavigate, useParams } from 'react-router-dom';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';
import MoneyCard from '../../components/MoneyCard';
import Button from '../../components/Button';
import useGetExpenses from '../expense/useGetExpenses';
import ExpenseItem from '../expense/ExpenseItem';
import { FullPageSpinner } from '../../components/Spinner';
import Message from '../../components/Message';
import useGetBudget from './useGetBudget';
import ConfirmDelete from '../../components/ConfirmDelete';
import { useState } from 'react';
import useDeleteBudget from './useDeleteBudget';
import useUserId from '../../hooks/useUserId';

function Budget() {
  const uid = useUserId();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { budget, isBudgetLoading } = useGetBudget(id, uid);
  const { expenses, isExpensesLoading } = useGetExpenses(id, uid);
  const { deleteBudget, isBudgetDeleting } = useDeleteBudget(
    setIsConfirmDeleteModalOpen,
  );

  return (
    <>
      <div className='h-screen flex flex-col'>
        {isBudgetLoading || isExpensesLoading ? (
          <FullPageSpinner />
        ) : (
          <>
            <div className='bg-gradient-to-b from-[#FFF6E5] to-[#fefbf6d8] rounded-[0_0_2.5rem_2.5rem]'>
              <HeaderWithBackButton
                navigateTo='/budgets'
                variant='black'
                title={budget?.budgetName || 'Budget Name'}
              >
                <div className='flex justify-end gap-3'>
                  <img
                    onClick={() =>
                      navigate('/editbudget', { state: { budget, expenses } })
                    }
                    src={editIcon}
                    alt='edit icon'
                    className='cursor-pointer'
                  />
                  <img
                    src={deleteIcon}
                    alt='delete icon'
                    className='cursor-pointer'
                    onClick={() => setIsConfirmDeleteModalOpen(true)}
                  />
                </div>
              </HeaderWithBackButton>
              <div className='p-10 pt-0 flex items-center justify-center gap-6'>
                <MoneyCard variant='income' amount={budget?.budgetAmount} />
                <MoneyCard variant='balance' amount={budget?.balanceBudget} />
              </div>
            </div>
            <div className='flex-1 overflow-auto p-10 flex flex-col gap-4'>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    budgetName={budget?.budgetName}
                  />
                ))
              ) : (
                <Message>
                  You have no expenses. Tap on{' '}
                  <span className='font-bold'>Add expense</span> to get started.
                </Message>
              )}
            </div>

            <Button
              additionalStyles={'rounded-none'}
              onClick={() =>
                navigate('addexpense', {
                  state: { budgetName: budget.budgetName },
                })
              }
            >
              Add Expense
            </Button>
          </>
        )}
      </div>
      <ConfirmDelete
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={() => deleteBudget(id)}
        processing={isBudgetDeleting}
      />
    </>
  );
}

export default Budget;
