import { Controller } from 'react-hook-form';
import Label from './Label';
import ReactDatePicker from 'react-datepicker';

function DatePicker({
  name,
  control,
  errors,
  dateFormat = 'dd-mm-yyyy',
  label = 'Label',
  disabled = false,
}) {
  return (
    <div>
      <Label variant='form'>{label}</Label>
      <Controller
        control={control}
        name={name}
        rules={{ required: { value: true } }}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            disabled={disabled}
            className={`${
              errors[name] &&
              'outline outline-1 outline-red-100 outline-offset-[-1px]'
            }`}
            dateFormat={dateFormat}
            showMonthYearPicker
            selected={value}
            onChange={(date) => {
              onChange(date);
            }}
          />
        )}
      />
    </div>
  );
}

export default DatePicker;
