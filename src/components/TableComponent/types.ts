import { TableCellProps } from '@mui/material';

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: TableCellProps['align'];
  format?: (value: number | string) => string;
}
