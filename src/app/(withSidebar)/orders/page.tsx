'use client';

import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import OrderList from '../../../components/OrderList';

export default function Page() {
  const [input, setInput] = useState<string>('');

  const handleSubmitInput = () => {
    console.log('submitted', input);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Customer Order Management
      </Typography>

      <div className="flex w-full gap-2 items-center">
        <TextField
          id="outlined-basic"
          label="Find by Customer"
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmitInput();
            }
          }}
          size="small"
        />
        <Button
          variant="contained"
          disabled={input === ''}
          onClick={handleSubmitInput}
        >
          Find
        </Button>
      </div>

      <OrderList />
    </div>
  );
}
