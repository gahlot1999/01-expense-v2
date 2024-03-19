import { useParams } from 'react-router-dom';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';
import MoneyCard from '../../components/MoneyCard';

function Budget() {
  const { id: budgetId } = useParams();

  return (
    <>
      <div className='h-screen'>
        <div className='bg-gradient-to-b from-[#FFF6E5] to-[#fefbf6d8] rounded-[0_0_2.5rem_2.5rem]'>
          <HeaderWithBackButton variant='black' title='Kritika - March'>
            <div className='flex justify-end gap-3'>
              <img src={editIcon} alt='edit icon' className='cursor-pointer' />
              <img
                src={deleteIcon}
                alt='delete icon'
                className='cursor-pointer'
              />
            </div>
          </HeaderWithBackButton>
          <div className='p-10 pt-0 flex items-center justify-center gap-4'>
            <MoneyCard variant='income' />
            <MoneyCard variant='expense' />
          </div>
        </div>
      </div>
    </>
  );
}

export default Budget;
