import { formatCurrency, formatDate } from '../../utils/helpers';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';
import ConfirmDelete from '../../components/ConfirmDelete';
import { useState } from 'react';
import useDeleteEmi from './useDeleteEmi';
import useUserId from '../../hooks/useUserId';

function Emi({ emi, setFormStatus, setToBeEditedForm, setIsAddEditModalOpen }) {
  const uid = useUserId();
  const [isDeleteEmiModalOpen, setIsDeleteEmiModalOpen] = useState(false);
  const [selectedEmiId, setSelectedEmiId] = useState('');
  const { deleteEmi, isEmiDeleting } = useDeleteEmi(setIsDeleteEmiModalOpen);

  return (
    <>
      <div>
        <div className='grid grid-cols-[minmax(15rem,1fr)_6rem] items-center gap-4 p-4 bg-gradient-to-r from-red-20/80 to-light-100 rounded-2xl'>
          <div className='space-y-2'>
            <div>
              <p className='font-semibold'>{emi.emiName}</p>
              <p className='text-extra-tiny text-dark-25/80 italic'>
                {emi.emiDescription}
              </p>
            </div>
            <p className='font-semibold text-red-100'>
              {formatCurrency(emi.emiAmount)}
            </p>
          </div>
          <div className='flex items-center justify-self-end gap-2'>
            <img
              src={editIcon}
              alt='edit icon'
              onClick={() => {
                setFormStatus('edit');
                setToBeEditedForm(emi);
                setIsAddEditModalOpen(true);
              }}
              className='cursor-pointer'
              height='20'
              width='20'
            />
            <img
              src={deleteIcon}
              alt='delete icon'
              onClick={() => {
                setSelectedEmiId(emi.id);
                setIsDeleteEmiModalOpen(true);
              }}
              className='cursor-pointer'
              height='20'
              width='20'
            />
          </div>
        </div>
        <div className='flex items-center justify-between text-extra-tiny text-dark-50/60 italic'>
          <p>
            Start:{' '}
            <span className='font-semibold'>
              {formatDate(emi.emiStart, ['month', 'year'])}
            </span>
          </p>
          <p>
            End:{' '}
            <span className='font-semibold'>
              {' '}
              {formatDate(emi.emiEnd, ['month', 'year'])}
            </span>
          </p>
        </div>
      </div>

      <ConfirmDelete
        isOpen={isDeleteEmiModalOpen}
        onClose={() => setIsDeleteEmiModalOpen(false)}
        processing={isEmiDeleting}
        onConfirm={() => deleteEmi({ selectedEmiId, uid })}
      />
    </>
  );
}

export default Emi;
