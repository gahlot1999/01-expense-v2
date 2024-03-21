import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import Modal from '../../../components/Modal';
import { ButtonSpinner } from '../../../components/Spinner';
import useUserId from '../../../hooks/useUserId';

function AddCategoryForm(props) {
  const uid = useUserId();
  const {
    isOpen,
    onClose,
    onConfirm,
    processing,
    register,
    errors,
    isDirty,
    handleSubmit,
    reset,
  } = props;
  const isCategoryAdding = processing === 'pending';

  function submitAddCategoryForm(data) {
    const category = [
      {
        categoryValue: data.categoryName,
        categoryLabel: data.categoryName,
        uid,
      },
    ];
    onConfirm(category);
  }

  if (isOpen)
    return (
      <Modal variant='bottom'>
        <form
          onSubmit={handleSubmit(submitAddCategoryForm)}
          className='flex flex-col items-center gap-8'
        >
          <p className='text-title-sm font-semibold text-dark-75'>
            Add Category
          </p>
          <div>
            <Label>Category Name</Label>
            <Input
              {...register('categoryName', { required: true })}
              errors={errors}
              disabled={isCategoryAdding}
            />
          </div>
          <div className='flex items-center gap-8'>
            <Button
              variant='secondary'
              disabled={isCategoryAdding}
              onClick={() => {
                reset();
                onClose();
              }}
              type='reset'
            >
              Close
            </Button>
            <Button disabled={!isDirty || isCategoryAdding}>
              {isCategoryAdding ? <ButtonSpinner /> : 'Add'}
            </Button>
          </div>
        </form>
      </Modal>
    );
}

export default AddCategoryForm;
