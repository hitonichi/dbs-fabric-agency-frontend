import { Card, CardContent, Typography } from '@mui/material';
import { IOrderPayment } from './types';
import { TableColumn } from '../../TableComponent/types';
import TableComponent from '../../TableComponent';
import { toCurrencyString } from '../../../utils/strings';

interface PaymentInfoCardProps {
  payments: IOrderPayment[];
}

const columns: TableColumn[] = [
  {
    id: 'timestamp',
    label: 'Timestamp',
    minWidth: 300,
    align: 'left',
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 200,
    align: 'center',
    format: toCurrencyString,
  },
];

export default function PaymentInfoCard({ payments }: PaymentInfoCardProps) {
  // const mockPayments = [];
  return (
    <Card sx={{ minWidth: 500 }} style={{ backgroundColor: '#EEF5FF' }}>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Payment Information
          </Typography>
          {payments.length == 0 ? (
            <>No payment recorded.</>
          ) : (
            <div className="mt-2 flex justify-between items-start gap-4">
              {/* <Card sx={{ minWidth: 200, height: '100%' }}>
                <CardContent>
                  <div className="flex flex-col gap-2 h-full">
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Payment Status
                    </Typography>

                  </div>
                </CardContent>
              </Card> */}
              <TableComponent columns={columns} rows={payments} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
