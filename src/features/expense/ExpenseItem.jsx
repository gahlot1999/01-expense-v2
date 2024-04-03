import { formatCurrency, formatDate } from '../../utils/helpers';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';
import { useState } from 'react';
import ConfirmDelete from '../../components/ConfirmDelete';
import useDeleteExpense from './useDeleteExpense';
import { useNavigate } from 'react-router-dom';

function ExpenseItem({ expense, budgetName }) {
  const isEmi = expense.isEMI;
  const navigate = useNavigate();
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [isConfirmDeleteExpenseOpen, setIsConfirmDeleteExpenseOpen] =
    useState(false);

  const { deleteExpense, isExpenseDeleting } = useDeleteExpense(
    setIsConfirmDeleteExpenseOpen,
  );

  return (
    <>
      <div>
        <div
          className={`grid grid-cols-[minmax(12rem,1fr)_8rem_6rem] items-center gap-4 p-4 bg-gradient-to-r from-light-20 to-light-100 rounded-2xl ${
            isEmi && 'from-red-20/80'
          }`}
        >
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
