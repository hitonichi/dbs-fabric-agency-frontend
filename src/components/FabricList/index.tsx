import * as React from 'react';
import TableComponent from '../TableComponent';
import { TableCellProps } from '@mui/material';

interface Column {
  id: 'category' | 'colour' | 'quantity' | 'supplier' | 'price';
  label: string;
  minWidth?: number;
  align?: TableCellProps['align'];
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'category', label: 'Category', minWidth: 200 },
  { id: 'colour', label: 'Colour', minWidth: 200 },
  {
    id: 'supplier',
    label: 'Imported by',
    minWidth: 200,
    // format: (value: number) => value.toFixed(2),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 200,
    align: 'right',
    format: toCurrencyString,
  },
  {
    id: 'quantity',
    label: 'Quantity (Bolts)',
    minWidth: 200,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  id: string;
  category: string;
  colour: string;
  price: number;
  quantity: number;
  supplier: string;
}

function createData(
  id: string,
  category: string,
  colour: string,
  price: number,
  quantity: number,
  supplier: string
): Data {
  return { id, category, colour, price, quantity, supplier };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rows = [
  createData('10001', 'Silk', '#BDB1A8', 1234, 1000, 'John Murtough'),
  createData('10002', 'Jacquard', '#746E50', 1234, 1000, 'John Murtough'),
  createData('10003', 'Damask', '#8B5959', 1234, 1000, 'John Murtough'),
  createData('10004', 'Khaki', '#F0E68C', 1234, 1000, 'John Murtough'),
  createData('10005', 'Silk', '#B7A99B', 1234, 1000, 'John Murtough'),
  createData('10006', 'Faux silk', '#FFBF00', 1234, 1000, 'John Murtough'),
  createData('10007', 'Crewel', '#CBB99B', 1234, 1000, 'John Murtough'),
  createData('10008', 'Damask', '#FCF2DF', 1234, 1000, 'John Murtough'),
];

import MOCK_FABRIC from '../../app/(withSidebar)/fabric/mock.json';
import { toCurrencyString } from '../../utils/strings';

export default function FabricList({ supplier }) {
  return (
    <TableComponent
      filterFunc={
        supplier
          ? (row) => {
              return row.supplierId == supplier.id;
            }
          : null
      }
      columns={columns}
      rows={MOCK_FABRIC}
      navigateBasePath={'fabric'}
    />
  );
}
