import { formatCurrency, formatDate } from '../../utils/helpers';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';

function Emi({ emi }) {
  return (
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
            className='cursor-pointer'
            height='20'
            width='20'
          />
          <img
            src={deleteIcon}
            alt='delete icon'
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
  );
}

export default Emi;