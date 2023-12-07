'use client';

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SupplierList from '../../../components/SupplierList';
import ComboboxFilter from '../../../components/ComboboxFilter';

// Code to generate JSON:
// [
//   '{{repeat(5)}}',
//   {
//     id: '{{index(10000)}}',
//     name: '{{firstName()}} {{surname()}} {{integer(0,999)}}',
//     address: '{{integer(0,200)}} {{street()}}, {{city()}}',
//     taxCode: '{{integer(100000, 999999)}}',
//     bankAccount: '{{integer(100000, 999999)}}',
//     staffId: '{{integer(10000,99999)}}',
//   },
// ];

import MOCK_SUPPLIERS from './mock.json';

export default function Page() {
  const [input, setInput] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    setSelectedSupplier(input);
  }, [input]);

  const mappedOptions = MOCK_SUPPLIERS.map((sup) => {
    return { ...sup, label: sup.name, id: `${sup.id}` };
  });

  // const handleSubmitInput = () => {
  //   console.log('submitted', input);
  // };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Suppliers
      </Typography>
      <ComboboxFilter
        label="Filter by Supplier ID"
        options={mappedOptions}
        input={input}
        setInput={setInput}
      />

      <SupplierList supplier={selectedSupplier} />
    </div>
  );
}
