'use client';

import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  Typography,
  CircularProgress,
} from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../FormInput';
import { useEffect, useState } from 'react';
import { object, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  validateBankAccount,
  validatePhoneList,
  validateTaxCode,
} from '../../utils/strings';

const registerSchema = object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(20, 'Name should not be longer than 20 characters'),
  phone: z
    .string()
    .nonempty()
    .refine(
      (val) => validatePhoneList(val),
      'Invalid phone number(s): a phone number should be of 7-15 digits length, and each is separated by a comma.'
    ),
  address: z
    .string()
    .nonempty('Address is required')
    .max(50, 'Address should not be longer than 50 characters'),
  taxCode: z
    .string()
    .nonempty('Tax code is required')
    .refine(
      (val) => validateTaxCode(val),
      'Tax code should be a digit string with a maximum length of 15 digits.'
    ),
  bank: z
    .string()
    .nonempty('Bank account is required')
    .refine(
      (val) => validateBankAccount(val),
      'Bank account should be a digit string with a maximum length of 20 digits.'
    ),
  staffID: z.string().nonempty('Staff is required'),
});

const SupplierRegisterForm = () => {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    // register,
    setError,
    formState: { errors },
  } = methods;

  // const sleep = ms => new Promise((resolve) => {setTimeout(resolve, ms)})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandler: SubmitHandler<any> = async (values) => {
    // await sleep(2000)
    console.log('submitting form:', values);
    const apiRes = await fetch('/api/suppliers', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    if (apiRes.ok) {
      console.log('Hehe submitted', values);
      setOpenSnackbar(true);
      reset();
    } else {
      const res = await apiRes.json();
      console.log('Error: ', res);
      if (res.type == 'PHONE_EXISTED')
        setError('phone', {
          type: 'custom',
          message: 'Some phone number existed, please change.',
        });
      else {
        alert('Something went wrong. (' + apiRes.statusText + ')');
      }
    }
    // if (values.phone.includes(EXISTED_PHONE_NUMBER)) {
    //   console.log('phone exists');
    //   setError('phone', {
    //     type: 'custom',
    //     message: `Phone number '${EXISTED_PHONE_NUMBER} already exists, please try another number.`,
    //   });
    // } else {
    //   console.log('submitted successfully');
    // }
  };
  console.log(errors);

  const [pStaff, setPStaffs] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/staffs/partner');
      const { data } = await res.json();

      console.log('STAFF GOT:', data);
      setPStaffs(
        data.map((e) => ({
          ...e,
          label: e.id + ' - ' + e.name,
          value: e.id,
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
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
          <FormInput
            name="staffID"
            required
            select
            fullWidth
            label="Partner Staff"
            type="text"
            sx={{ mb: 2 }}
          >
            {pStaff.length == 0 && <CircularProgress />}
            {pStaff.length > 0 &&
              pStaff.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
          </FormInput>
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
