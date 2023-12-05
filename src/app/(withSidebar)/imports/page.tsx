'use client';

import dayjs, { Dayjs } from 'dayjs';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ImportList from '../../../components/ImportList';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ComboboxFilter from '../../../components/ComboboxFilter';

const DEFAULT_DATE_RANGE = {
  from: dayjs('2000-01-01'),
  to: dayjs('2099-01-01'),
};

export default function Page() {
  const [supplier, setSupplier] = useState(null);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleResetInput = () => {
    console.log('resetting', supplier, startDate, endDate);
    setSupplier(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handleSubmitInput = () => {
    const [from, to] = [
      startDate || DEFAULT_DATE_RANGE.from,
      endDate || DEFAULT_DATE_RANGE.to,
    ];
    console.log(
      'submitted',
      supplier,
      from.format('YYYYMMDD'),
      to.format('YYYYMMDD')
    );
    console.log('COMPARING: to is after from?', to.isAfter(from));
    if (to.isAfter(from)) {
      // Make API call here
      const req = new Request('/api/imports', {
        method: 'POST',
        body: JSON.stringify({ supplier: supplier.id, from, to }),
      });

      fetch(req)
        .then((res) =>
          res.json().then((data) => {
            console.log('[Client] got data', data);
          })
        )
        .catch((e) => {
          console.error('[Client] ERROR', e);
        });
    } else {
      alert('End date should be after Start date.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/suppliers');
      const { data } = await res.json();

      console.log('got data', data);
      setSuppliersOptions(
        data.map((s) => ({
          ...s,
          label: s.name,
          value: s.id,
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Import Browsing
      </Typography>

      {/* SEARCH SECTION */}
      <div className="flex w-full gap-2 items-center ">
        {/* <TextField
          id="outlined-basic"
          label="Supplier"
          variant="outlined"
          // sx={{ width: '100%' }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmitInput();
            }
          }}
        /> */}

        <ComboboxFilter
          label="Filter by Supplier"
          options={suppliersOptions}
          input={supplier}
          setInput={setSupplier}
          size="medium"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={startDate}
            onChange={(val) => setStartDate(val)}
            sx={{ width: '35%' }}
          />
          <DatePicker
            label="To"
            value={endDate}
            onChange={(val) => setEndDate(val)}
            sx={{ width: '35%' }}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          disabled={!supplier && !startDate && !endDate}
          onClick={handleResetInput}
          sx={{ py: 1.5, px: 4, fontSize: 'large' }}
          color="secondary"
        >
          Clear
        </Button>
        <Button
          variant="contained"
          disabled={!supplier && !startDate && !endDate}
          onClick={handleSubmitInput}
          sx={{ py: 1.5, px: 4, fontSize: 'large' }}
        >
          Find
        </Button>
      </div>

      <ImportList />
    </div>
  );
}
