import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({ name, ...restProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...restProps}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? <>{errors[name].message}</> : ''}
        />
      )}
    />
  );
};

export default FormInput;
