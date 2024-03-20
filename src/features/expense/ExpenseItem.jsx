import { formatCurrency } from '../../utils/helpers';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';
import { useState } from 'react';
import ConfirmDelete from '../../components/ConfirmDelete';
import useDeleteExpense from '../../hooks/useDeleteExpense';
import { useNavigate } from 'react-router-dom';

function ExpenseItem({ expenses, budgetName }) {
  const navigate = useNavigate();
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [isConfirmDeleteExpenseOpen, setIsConfirmDeleteExpenseOpen] =
    useState(false);

  const { deleteExpense, isExpenseDeleting } = useDeleteExpense(
    setIsConfirmDeleteExpenseOpen,
  );
  return (
    <>
      {expenses.map((exp) => (
        <div
          key={exp.id}
          className='grid grid-cols-[minmax(12rem,1fr)_8rem_6rem] items-center gap-4 p-4 bg-gradient-to-r from-light-20 to-light-100 rounded-2xl'
        >
          <div>
            <p className='font-medium'>{exp.expenseName}</p>
            <p className='text-extra-tiny text-dark-25/80 italic'>
              {exp.expenseCategory}
            </p>
          </div>
          <p className='font-semibold'>{formatCurrency(exp.expenseAmount)}</p>
          <div className='flex items-center justify-self-end gap-2'>
            <img
              src={editIcon}
              onClick={() =>
                navigate('editexpense', {
                  state: { budgetName, expenseInfo: exp },
                })
              }
              alt='edit icon'
              className='cursor-pointer'
              height='20'
              width='20'
            />
            <img
              src={deleteIcon}
              onClick={() => {
                setSelectedExpenseId(exp.id);
                setIsConfirmDeleteExpenseOpen(true);
              }}
              alt='delete icon'
              className='cursor-pointer'
              height='20'
              width='20'
            />
          </div>
        </div>
      ))}

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
