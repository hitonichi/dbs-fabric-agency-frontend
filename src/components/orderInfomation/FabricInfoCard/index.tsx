import { Card, CardContent, Typography } from '@mui/material';
import TableComponent from '../../TableComponent';
import { TableColumn } from '../../TableComponent/types';
import { IFabricCategory } from './types';
import { toCurrencyString } from '../../../utils/strings';

export interface FabricInfoCardProps {
  bolts: IFabricCategory[];
}

const columns: TableColumn[] = [
  {
    id: 'category',
    label: 'Category',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'color',
    label: 'Color',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'length',
    label: 'Bolt Length',
    minWidth: 250,
    align: 'center',
  },
  {
    id: 'price',
    label: 'Bolt Price',
    minWidth: 250,
    align: 'center',
    format: toCurrencyString,
  },
];

export default function FabricInfoCard({ bolts }: FabricInfoCardProps) {
  return (
    <>
      <Card sx={{ minWidth: 500 }} style={{ backgroundColor: '#9FD4C2' }}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              List of Fabric Categories
            </Typography>
            {bolts.length == 0 ? (
              <>No category recorded.</>
            ) : (
              <div className="mt-2">
                <TableComponent columns={columns} rows={bolts} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
