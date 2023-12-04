'use client';

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ComboboxFilter from '../../../components/ComboboxFilter';

import { TableColumn } from '../../../components/TableComponent/types';
import { toCurrencyString } from '../../../utils/strings';
import TableComponent from '../../../components/TableComponent';

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

const columns: TableColumn[] = [
  {
    id: 'category',
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
    id: 'lastUpdated',
    label: 'Last Price Updated',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'quantity',
    label: 'Available Quantity',
    minWidth: 200,
    align: 'center',
  },
  {
    id: 'price',
    label: 'Bolt Price',
    minWidth: 200,
    align: 'center',
    format: toCurrencyString,
  },
];

export default function Page() {
  const [input, setInput] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [suppliers, setSuppliers] = useState([]);

  // useEffect(() => {
  //   setSelectedSupplier(input);
  // }, [input]);

  console.log('categories', categories, filteredCategories);

  useEffect(() => {
    const fetchData = async () => {
      // Fetching & getting categories
      const fabricRes = await fetch('/api/fabric');
      const fabricData = await fabricRes.json();

      setCategories(fabricData.data);

      // Fetching & setting suppliers
      const supRes = await fetch('/api/suppliers');
      const supData = await supRes.json();
      console.log('[Fabric] got supRes', supRes, supData);

      setSuppliers(
        supData.data.map((s) => ({
          ...s,
          label: s.name,
          value: s.id,
        }))
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (input && input.id) {
      console.log('input changed', input);
      setFilteredCategories(categories.filter((c) => c.supplierID == input.id));
    } else {
      setFilteredCategories(categories);
    }
  }, [input, categories]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Fabric Categories
      </Typography>

      <ComboboxFilter
        label="Filter by Supplier ID"
        options={suppliers}
        input={input}
        setInput={setInput}
      />

      <TableComponent columns={columns} rows={filteredCategories} />
    </div>
  );
}
