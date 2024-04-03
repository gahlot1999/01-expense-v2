import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Modal from '../../components/Modal';
import DatePicker from '../../components/DatePicker';
import useUserId from '../../hooks/useUserId';
import useAddEmi from './useAddEmi';
import { ButtonSpinner } from '../../components/Spinner';
import useUpdateEmi from './useUpdateEmi';

function AddEditEmiForm({ isOpen, onClose, toBeEditedForm, formStatus }) {
  const uid = useUserId();
  const { addEmi, isEmiAdding } = useAddEmi(onClose);
  const { updateEmi, isEmiUpdating } = useUpdateEmi(onClose);
  const isEditing = formStatus === 'edit';
  const processing = isEmiAdding || isEmiUpdating;

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    values: {
      emiName: isEditing ? toBeEditedForm.emiName : '',
      emiDescription: isEditing ? toBeEditedForm.emiDescription : '',
      emiAmount: isEditing ? toBeEditedForm.emiAmount : '',
      emiStart: isEditing ? toBeEditedForm.emiStart : '',
      emiEnd: isEditing ? toBeEditedForm.emiEnd : '',
    },
  });

  function addEditEmi(data) {
    if (isEditing) {
      const updatedEmi = {
        ...data,
        emiStart: data.emiStart.toString(),
        emiEnd: data.emiEnd.toString(),
      };

      updateEmi({ updatedEmi, id: toBeEditedForm.id, uid });
      return;
    }
    const emi = [
      {
        ...data,
        emiStart: data.emiStart.toString(),
        emiEnd: data.emiEnd.toString(),
        uid,
      },
    ];

    addEmi(emi);
  }

  if (isOpen)
    return (
      <Modal variant='bottom'>
        <form className='space-y-2' onSubmit={handleSubmit(addEditEmi)}>
          <p className='font-semibold text-regular-lg text-center'>
            {isEditing ? 'Edit EMI' : 'Add EMI'}
          </p>

          <div className='flex flex-col items-center gap-4'>
            <div className='w-full'>
              <Label>EMI Name</Label>
              <Input
                {...register('emiName', { required: true })}
                errors={errors}
                disabled={processing}
              />
            </div>
            <div className='w-full'>
              <Label>EMI Description</Label>
              <Input
                {...register('emiDescription', { required: true })}
                errors={errors}
                disabled={processing}
              />
            </div>
            <div className='w-full'>
              <Label>EMI Amount</Label>
              <Input
                type='number'
                {...register('emiAmount', { required: true })}
                errors={errors}
                disabled={processing}
              />
            </div>
            <div className='flex gap-8'>
              <DatePicker
                label='EMI Start Date'
                name='emiStart'
                control={control}
                errors={errors}
                dateFormat='MMM-yyyy'
                disabled={processing}
              />
              <DatePicker
                label='EMI End Date'
                name='emiEnd'
                control={control}
                errors={errors}
                dateFormat='MMM-yyyy'
                disabled={processing}
              />
            </div>
            <div className='flex items-center gap-8'>
              <Button
                variant='secondary'
                type='reset'
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Close
              </Button>
              <Button disabled={!isDirty}>
                {processing ? <ButtonSpinner /> : isEditing ? 'Edit' : 'Add'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    );
}

export default AddEditEmiForm;
