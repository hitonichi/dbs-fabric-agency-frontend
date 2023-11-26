'use client';

import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../FormInput';
import { useEffect, useState } from 'react';
import { object, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = object({
  name: z.string().nonempty('Name is required'),
  phone: z.array(z.string()).nonempty(),
  address: z.string().nonempty('Address is required'),
  taxCode: z.string().nonempty('Tax code is required'),
  bank: z.string().nonempty('Bank account is required'),
});

const SupplierRegisterForm = () => {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    // register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      setOpenSnackbar(true);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandler: SubmitHandler<any> = (values) => {
    console.log('form:', values);
  };
  console.log(errors);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackbar(false);
          }}
          severity="success"
          sx={{ width: '100%' }}
        >
          Supplier information added!
        </Alert>
      </Snackbar>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Register a new supplier
      </Typography>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormInput
            name="name"
            required
            fullWidth
            label="Supplier's name"
            type="text"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="phone"
            required
            fullWidth
            label="Supplier's phone number(s)"
            type="text"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="address"
            required
            fullWidth
            label="Supplier's address"
            type="text"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="taxCode"
            required
            fullWidth
            label="Supplier's tax code"
            type="text"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="bank"
            required
            fullWidth
            label="Supplier's bank account"
            type="text"
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            type="submit"
            // loading={loading}
            variant="contained"
          >
            Register
          </Button>
        </Box>
      </FormProvider>
    </div>
  );
};

export default SupplierRegisterForm;
