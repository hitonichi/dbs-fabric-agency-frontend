'use client';

import dayjs, { Dayjs } from 'dayjs';
import { Button, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ComboboxFilter from '../../../components/ComboboxFilter';
import { toCurrencyString } from '../../../utils/strings';
import { TableColumn } from '../../../components/TableComponent/types';
import TableComponent from '../../../components/TableComponent';

const DEFAULT_DATE_RANGE = {
  from: dayjs('2000-01-01'),
  to: dayjs('2099-01-01'),
};

const columns: TableColumn[] = [
  {
    id: 'date',
    label: 'Import Date',
    minWidth: 200,
    align: 'left',
    format: (val: string) => dayjs(val).format('YYYY-MM-DD'),
  },
  {
    id: 'name',
    label: 'Category',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'color',
    label: 'Color',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'supplierName',
    label: 'Imported by',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'phone',
    label: 'Supplier phone(s)',
    minWidth: 300,
    align: 'left',
    // format: (val: string) => val + ', ' + val + ', ' + val + ', ' + val,
  },
  {
    id: 'quantity',
    label: 'Imported Quantity',
    minWidth: 200,
    align: 'center',
  },
  {
    id: 'price',
    label: 'Imported Price',
    minWidth: 200,
    align: 'center',
    format: toCurrencyString,
  },
];

export default function Page() {
  const [supplier, setSupplier] = useState(null);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleResetInput = () => {
    console.log('resetting', supplier, startDate, endDate);
    setSupplier('');
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
        body: JSON.stringify({ supplier: supplier?.id, from, to }),
      });

      setLoading(true);
      fetch(req)
        .then((res) =>
          res.json().then((data) => {
            console.log('[Client] got data', data);

            if (data.data.length == 0) {
              // indicating no import
              alert(
                'This supplier has not import any fabric during this period.'
              );
            }
            setImports(data.data);
            setLoading(false);
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

        {/* <Button
          variant="contained"
          disabled={!supplier && !startDate && !endDate}
          onClick={handleResetInput}
          sx={{ py: 1.5, px: 4, fontSize: 'large' }}
          color="secondary"
        >
          Clear
        </Button> */}
        <Button
          variant="contained"
          disabled={!supplier && !startDate && !endDate}
          onClick={handleSubmitInput}
          sx={{ py: 1.5, px: 4, fontSize: 'large' }}
        >
          Find
        </Button>
      </div>

      {loading && (
        <div className="w-full">
          <CircularProgress />
        </div>
      )}
      {!loading && imports.length > 0 && (
        <TableComponent columns={columns} rows={imports} />
      )}
      {!loading && imports.length == 0 && (
        <Typography>Fill in the above filter to find imports</Typography>
      )}
    </div>
  );
}
