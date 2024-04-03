import { useState } from 'react';
import Button from '../../components/Button';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import Message from '../../components/Message';
import { FullPageSpinner } from '../../components/Spinner';
import useUserId from '../../hooks/useUserId';
import AddEditEmiForm from './AddEditEmiForm';
import Emi from './Emi';
import useGetAllEmi from './useGetAllEmi';

function EmiLanding() {
  const uid = useUserId();
  const { emiData, isEmiLoading } = useGetAllEmi(uid);
  const [isAddEditEmiModalOpen, setIsAddEditModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [toBeEditedForm, setToBeEditedForm] = useState(null);

  return (
    <>
      <div className='h-screen flex flex-col'>
        <div className='bg-yellow-100 rounded-[0_0_3.2rem_3.2rem]'>
          <HeaderWithBackButton title='EMI' />
        </div>
        <div className='p-10 flex-1 overflow-y-auto flex flex-col gap-4'>
          {isEmiLoading ? (
            <FullPageSpinner />
          ) : emiData.length === 0 ? (
            <Message>
              You have no emi. Tap on{' '}
              <span className='font-bold'>Add New EMI</span> to get started.
            </Message>
          ) : (
            emiData.map((emi) => (
              <Emi
                emi={emi}
                key={emi.id}
                setFormStatus={setFormStatus}
                setToBeEditedForm={setToBeEditedForm}
                setIsAddEditModalOpen={setIsAddEditModalOpen}
              />
            ))
          )}
        </div>
        <Button
          additionalStyles='rounded-none'
          onClick={() => {
            setFormStatus('new');
            setIsAddEditModalOpen(true);
          }}
        >
          Add New EMI
        </Button>
      </div>

      <AddEditEmiForm
        toBeEditedForm={toBeEditedForm}
        formStatus={formStatus}
        key={Math.random()}
        isOpen={isAddEditEmiModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
      />
    </>
  );
}

export default EmiLanding;
