import * as React from 'react';
import TableComponent from '../TableComponent';
import { TableCellProps } from '@mui/material';

interface Column {
  id: 'date' | 'fabric' | 'quantity' | 'supplier' | 'price';
  label: string;
  minWidth?: number;
  align?: TableCellProps['align'];
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'date', label: 'Date', minWidth: 200 },
  {
    id: 'fabric',
    label: 'Fabric Category',
    align: 'justify',
    minWidth: 200,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'supplier',
    label: 'Imported by',
    minWidth: 200,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'quantity',
    label: 'Quantity (Bolts)',
    minWidth: 200,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 200,
    align: 'right',
    format: (value: number) => '$ ' + value.toLocaleString('en-US'),
  },
];

interface Data {
  id: string;
  date: string;
  fabric: string;
  price: number;
  quantity: number;
  supplier: string;
}

function createData(
  id: string,
  date: string,
  fabric: string,
  colour: string,
  price: number,
  quantity: number,
  supplier: string
): Data {
  return { id, date, fabric: `${fabric} ${colour}`, price, quantity, supplier };
}

const rows = [
  createData(
    '11111',
    '2023-03-04',
    'Silk',
    '#BDB1A8',
    1234,
    1000,
    'John Murtough'
  ),
  createData(
    '11112',
    '2023-03-04',
    'Jacquard',
    '#746E50',
    1234,
    1000,
    'John Murtough'
  ),
  createData(
    '11113',
    '2023-03-04',
    'Damask',
    '#8B5959',
    1234,
    1000,
    'John Murtough'
  ),
  createData(
    '11114',
    '2023-03-04',
    'Khaki',
    '#F0E68C',
    1234,
    1000,
    'John Murtough'
  ),
  createData(
    '11115',
    '2023-03-04',
    'Silk',
    '#B7A99B',
    1234,
    1000,
    'John Murtough'
  ),
  createData(
    '11116',
    '2023-03-04',
    'Faux silk',
    '#FFBF00',
    1234,
    1000,
    'John Murtough'
  ),
  createData(
    '11117',
    '2023-03-04',
    'Crewel',
    '#CBB99B',
    1234,
    1000,
    'John Murtough'
  ),
  createData(
    '11118',
    '2023-03-04',
    'Damask',
    '#FCF2DF',
    1234,
    1000,
    'John Murtough'
  ),
];

export default function OrderList() {
  return (
    <TableComponent columns={columns} rows={rows} navigateBasePath={'orders'} />
  );
}
