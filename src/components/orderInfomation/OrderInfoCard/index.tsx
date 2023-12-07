import { Card, CardContent, Typography } from '@mui/material';
import { IOrderData } from '../../../app/api/orders/type';
import InfoEntry from '../InfoEntry';

interface IOrderInfo extends IOrderData {
  cancelReason: string;
}

export interface OrderInfoCardProps {
  order: IOrderInfo;
}

export default function OrderInfoCard({ order }: OrderInfoCardProps) {
  if (!order)
    return (
      <>
        <Card sx={{ minWidth: 500 }} style={{ backgroundColor: '#FFEBD8' }}>
          <CardContent>
            <div className="flex flex-col gap-2">
              There is no information for this order.
            </div>
          </CardContent>
        </Card>
      </>
    );
  return (
    <>
      <Card sx={{ minWidth: 500 }} style={{ backgroundColor: '#FFEBD8' }}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Order #{order.id}
            </Typography>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <InfoEntry label="Last updated" content={order.lastUpdated} />
                <InfoEntry label="Made by" content={order.customerName} />
                <InfoEntry label="In-charge staff" content={order.staffName} />
              </div>
              <div className="flex flex-col">
                <InfoEntry
                  label="Total price"
                  content={`$ ${(
                    Math.round(order.totalPrice * 100) / 100
                  ).toFixed(2)}`}
                />
                <InfoEntry label="Status" content={order.status} />
                {order.status === 'Cancelled' && (
                  <InfoEntry
                    label="Cancel reason"
                    content={order.cancelReason}
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
