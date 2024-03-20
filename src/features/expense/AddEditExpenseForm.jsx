import Label from '../../components/Label';
import Button from '../../components/Button';
import { ButtonSpinner } from '../../components/Spinner';
import Input from '../../components/Input';

function AddEditExpenseForm(props) {
  const {
    register,
    errors,
    isProcessing,
    handleSubmit,
    submitForm,
    inEditMode,
    isDirty,
    expenseCategories,
  } = props;
  return (
    <form className='flex flex-col gap-8' onSubmit={handleSubmit(submitForm)}>
      <div>
        <Label variant='form'>Expense Name</Label>
        <Input
          {...register('expenseName', { required: true })}
          errors={errors}
          disabled={isProcessing}
        />
      </div>
      <div>
        <Label variant='form'>Expense Amount</Label>
        <Input
          {...register('expenseAmount', { required: true })}
          errors={errors}
          type='number'
          inputMode='numeric'
          disabled={isProcessing}
        />
      </div>
      <div>
        <Label variant='form'>Expense Category</Label>
        <select
          {...register('expenseCategory', { required: true })}
          disabled={isProcessing}
          className={`${errors['expenseCategory'] && 'border-red-100'}`}
        >
          <option hidden></option>
          {expenseCategories?.map((cat) => (
            <option key={cat.categoryValue} value={cat.categoryValue}>
              {cat.categoryLabel}
            </option>
          ))}
        </select>
      </div>
      <Button
        type='submit'
        style={{ marginTop: '1rem' }}
        disabled={isProcessing || !isDirty}
      >
        {isProcessing ? <ButtonSpinner /> : inEditMode ? 'Edit' : 'Add'}
      </Button>
    </form>
  );
}

export default AddEditExpenseForm;
