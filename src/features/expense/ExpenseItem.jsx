import { formatCurrency, formatDate } from '../../utils/helpers';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';
import { useState } from 'react';
import ConfirmDelete from '../../components/ConfirmDelete';
import useDeleteExpense from './useDeleteExpense';
import { useNavigate } from 'react-router-dom';
import {
  ButtonSpinner,
  FullPageSpinner,
  Spinner,
} from '../../components/Spinner';
import useEditExpense from './useEditExpense';

function ExpenseItem({ expense, budgetName }) {
  const isEmi = expense.isEMI;
  const isPaid = expense.isPaid;
  const navigate = useNavigate();
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [isConfirmDeleteExpenseOpen, setIsConfirmDeleteExpenseOpen] =
    useState(false);

  const { deleteExpense, isExpenseDeleting } = useDeleteExpense(
    setIsConfirmDeleteExpenseOpen,
  );
  const { editExpense, isExpenseEditing } = useEditExpense();
  const isExpEditing = isExpenseEditing === 'pending';

  function handleIsPaidChange() {
    const updatedExpense = {
      id: expense.id,
      isPaid: !isPaid,
    };
    editExpense(updatedExpense);
  }

  return (
    <>
      {isExpEditing ? (
        <Spinner />
      ) : (
        <div>
          <div
            className={`grid grid-cols-[max-content_minmax(12rem,1fr)_8rem_6rem] items-center gap-4 p-4 bg-gradient-to-r to-light-100 rounded-2xl ${
              isEmi && !isPaid && 'from-red-20/80'
            } ${isPaid ? 'from-green-20' : 'from-light-20'}`}
          >
            <div>
              <input
                type='checkbox'
                className='align-middle h-6 w-6'
                checked={isPaid}
                onChange={handleIsPaidChange}
              />
            </div>
            <div>
              <p className='font-medium'>{expense.expenseName}</p>
              <p className='text-extra-tiny text-dark-25/80 italic'>
                {expense.expenseCategory}
              </p>
            </div>
            <p className={`font-semibold ${isEmi && 'text-red-100'}`}>
              {formatCurrency(expense.expenseAmount)}
            </p>
            <div className='flex items-center justify-self-end gap-2'>
              {!isEmi && (
                <img
                  src={editIcon}
                  onClick={() =>
                    navigate('editexpense', {
                      state: { budgetName, expenseInfo: expense },
                    })
                  }
                  alt='edit icon'
                  className='cursor-pointer'
                  height='20'
                  width='20'
                />
              )}
              <img
                src={deleteIcon}
                onClick={() => {
                  setSelectedExpenseId(expense.id);
                  setIsConfirmDeleteExpenseOpen(true);
                }}
                alt='delete icon'
                className='cursor-pointer'
                height='20'
                width='20'
              />
            </div>
          </div>
          {isEmi && (
            <div className='flex items-center justify-between text-extra-tiny text-dark-25/80 italic'>
              <p>
                Start:{' '}
                <span className='font-semibold'>
                  {formatDate(expense.emiInfo.start, ['month', 'year'])}
                </span>
              </p>
              <p>
                End:{' '}
                <span className='font-semibold'>
                  {formatDate(expense.emiInfo.end, ['month', 'year'])}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      <ConfirmDelete
        isOpen={isConfirmDeleteExpenseOpen}
        onClose={() => setIsConfirmDeleteExpenseOpen(false)}
        processing={isExpenseDeleting}
        onConfirm={() => deleteExpense(selectedExpenseId)}
      />
    </>
  );
}

export default ExpenseItem;
