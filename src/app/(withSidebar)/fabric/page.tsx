'use client';

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FabricList from '../../../components/FabricList';
import ComboboxFilter from '../../../components/ComboboxFilter';

import MOCK_SUPPLIERS from '../suppliers/mock.json';

// [
//   '{{repeat(100)}}',
//   {
//     id: '{{index(10000)}}',
//     category:
//       '{{random("Silk", "Jacquard", "Damask", "Khaki", "Faux silk", "Crewel")}}',
//     colour: '#{{integer(100000, 999999)}}',
//     price: '{{integer(10000, 100000)}}',
//     quantity: '{{integer(10, 90)*100}}',
//     supplier: '{{company()}} {{firstName()}}',
//     supplierId: '{{random("10001", "10002", "10003", "10004", "10000")}}',
//   },
// ];

export default function Page() {
  const [input, setInput] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    setSelectedSupplier(input);
  }, [input]);

  const mappedOptions = MOCK_SUPPLIERS.map((sup) => {
    return { ...sup, label: sup.name, id: `${sup.id}` };
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Fabric Categories
      </Typography>

      <ComboboxFilter
        label="Filter by Supplier ID"
        options={mappedOptions}
        input={input}
        setInput={setInput}
      />

      <FabricList supplier={selectedSupplier} />
    </div>
  );
}
