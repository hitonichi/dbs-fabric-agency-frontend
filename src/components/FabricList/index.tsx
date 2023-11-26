import * as React from 'react';
import TableComponent from '../TableComponent';
import { TableCellProps } from '@mui/material';

interface Column {
  id: 'category' | 'colour' | 'quantity' | 'supplier';
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
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 200,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  // {
  //   id: 'bank',
  //   label: 'Bank account',
  //   minWidth: 120,
  //   align: 'center',
  //   format: (value: number) => value.toLocaleString('en-US'),
  // },
];

interface Data {
  id: string;
  category: string;
  colour: string;
  quantity: number;
  supplier: string;
}

function createData(
  id: string,
  category: string,
  colour: string,
  quantity: number,
  supplier: string
): Data {
  return { id, category, colour, quantity, supplier };
}

const rows = [
  createData('11111', 'Silk', '#BDB1A8', 1000, 'John Murtough'),
  createData('11112', 'Jacquard', '#746E50', 1000, 'John Murtough'),
  createData('11113', 'Damask', '#8B5959', 1000, 'John Murtough'),
  createData('11114', 'Khaki', '#F0E68C', 1000, 'John Murtough'),
  createData('11115', 'Silk', '#B7A99B', 1000, 'John Murtough'),
  createData('11116', 'Faux silk', '#FFBF00', 1000, 'John Murtough'),
  createData('11117', 'Crewel', '#CBB99B', 1000, 'John Murtough'),
  createData('11118', 'Damask', '#FCF2DF', 1000, 'John Murtough'),
];

export default function FabricList() {
  return (
    <TableComponent columns={columns} rows={rows} navigateBasePath={'fabric'} />
  );
}
