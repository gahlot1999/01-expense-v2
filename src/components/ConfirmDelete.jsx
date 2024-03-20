import Button from './Button';
import Modal from './Modal';
import { ButtonSpinner } from './Spinner';

function ConfirmDelete(props) {
  const { isOpen, onClose, onConfirm, processing } = props;
  const isDeleting = processing === 'pending';

  if (isOpen)
    return (
      <Modal>
        <div className='text-center w-[80vw]'>
          <div>
            <p className='text-title-sm leading-9 font-semibold text-dark-75 mb-4'>
              Are you sure?
            </p>
            <p className='text-regular-sm text-dark-25 leading-7 mb-8'>
              You won&apos;t be able to revert this!
            </p>
          </div>
          <div className='flex items-center justify-center gap-6'>
            <Button variant='secondary' onClick={onClose} disabled={isDeleting}>
              No
            </Button>
            <Button onClick={onConfirm} disabled={isDeleting}>
              {isDeleting ? <ButtonSpinner /> : 'Yes'}
            </Button>
          </div>
        </div>
      </Modal>
    );
}

export default ConfirmDelete;
