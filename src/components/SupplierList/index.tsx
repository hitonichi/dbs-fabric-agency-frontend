import * as React from 'react';
import TableComponent from '../TableComponent';
import { TableCellProps } from '@mui/material';

interface Column {
  id: 'name' | 'address' | 'tax' | 'bank' | 'staff';
  label: string;
  minWidth?: number;
  align?: TableCellProps['align'];
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'address', label: 'Address', minWidth: 400 },
  {
    id: 'tax',
    label: 'Tax Code',
    minWidth: 120,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'bank',
    label: 'Bank account',
    minWidth: 120,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'staff',
    label: 'Maintained by',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  id: string;
  name: string;
  address: string;
  tax: string;
  bank: string;
  staff: string;
}

function createData(
  id: string,
  name: string,
  address: string,
  tax: string,
  bank: string,
  staff: string
): Data {
  return { id, name, address, tax, bank, staff };
}

const rows = [
  createData(
    '000001',
    'John Murtough',
    '271 Jester, Austin, Florida',
    '555666777',
    '000410004567',
    '2001'
  ),
  createData(
    '000002',
    'Joel Glazer',
    '212 Nixon, Geogre, California',
    '999999999',
    '000520001234',
    '2001'
  ),
  createData(
    '000003',
    'Darren Fletcher',
    '1480 Hull, Jorge, North Carolina',
    '000777888',
    '000720008888',
    '2002'
  ),
  createData(
    '000004',
    'Carloz Tevez',
    '1906 Clary, Maen, Utah',
    '112233444',
    '000110001111',
    '2002'
  ),
  createData(
    '000005',
    'Silk Agency',
    '2323 Unix, Iwah, Kansas',
    '987654321',
    '000880008888',
    '2001'
  ),
  createData(
    '000001',
    'John Murtough',
    '271 Jester, Austin, Florida',
    '555666777',
    '000410004567',
    '2001'
  ),
  createData(
    '000002',
    'Joel Glazer',
    '212 Nixon, Geogre, California',
    '999999999',
    '000520001234',
    '2001'
  ),
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SupplierList({ supplier }) {
  return (
    <TableComponent
      columns={columns}
      rows={rows}
      navigateBasePath={'suppliers'}
    />
  );
}
