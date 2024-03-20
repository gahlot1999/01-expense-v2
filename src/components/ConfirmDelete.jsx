import Button from './Button';
import Modal from './Modal';

function ConfirmDelete(props) {
  const { isOpen, onClose, onConfirm, processing } = props;
  const isDeleting = processing === 'pending';

  if (isOpen)
    return (
      <Modal>
        <div className='text-center w-[80vw]'>
          <div>
            <p className='text-title-sm leading-9 font-semibold text-dark-75 mb-4'>
              Remove this budget?
            </p>
            <p className='text-regular-sm text-dark-25 leading-7 mb-8'>
              Are you sure do you wanna remove this budget?
            </p>
          </div>
          <div className='flex items-center justify-center gap-6'>
            <Button variant='secondary' onClick={onClose} disabled={isDeleting}>
              No
            </Button>
            <Button onClick={onConfirm} disabled={isDeleting}>
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    );
}

export default ConfirmDelete;
