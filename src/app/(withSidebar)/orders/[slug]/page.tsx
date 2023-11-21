import { Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

export interface IOrder {
  id: string;
  author: {
    id: string;
    name: string;
  };
  createdOn: Date;
  staff: {
    id: string;
    name: string;
  };
  status: string;
  reason: string;
  totalPrice: number;
  fabricCategory: IFabricCategory;
}

const mockOrder: IOrder = {
  id: '111',
  author: {
    id: '123',
    name: 'John Smith',
  },
  createdOn: new Date(),
  staff: {
    id: '369',
    name: 'Helena Wang',
  },
  status: 'Open',
  reason: '',
  totalPrice: 1000.0,
  fabricCategory: {
    id: '000',
    name: 'Red Silk',
    quantity: 50,
  },
};

export default function Page({ params }: { params: { slug: string } }) {
  // Requirement:
  // Order info card
  // + Customer name
  // + Created on: Date()
  // + PIC: staff name
  // + status / with reason if 'cancelled'
  // + Total price
  // +
  // Category info
  // + Supplier (maybe with a link to the supplier view)
  // + Type - Color
  // + No. bolts
  // +
  // Payment history
  // + remaining payment
  // foreach:
  // + Timestamp
  // + Amount
  // +
  return (
    <div className="flex flex-col gap-4">
      <div>Order info: ID - {params.slug}</div>
      <OrderInfoCard order={mockOrder} />
      <FabricInfoCard fabricCategory={mockOrder.fabricCategory} />
      <PaymentInfoCard />
    </div>
  );
}

/* Payment info */
const PaymentInfoCard = () => {
  // const mockPayments = [];
  return (
    <Card sx={{ minWidth: 500 }} style={{ backgroundColor: '#EEF5FF' }}>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Payment Information
          </Typography>
          No payment recorded.
        </div>
      </CardContent>
    </Card>
  );
};

/* Category info */

export interface IFabricCategory {
  id: string;
  name: string;
  quantity: number;
}

export interface FabricInfoCardProps {
  fabricCategory: IFabricCategory;
}

const FabricInfoCard: FC<FabricInfoCardProps> = ({ fabricCategory }) => {
  return (
    <>
      <Card sx={{ minWidth: 500 }} style={{ backgroundColor: '#9AD0C2' }}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Fabric Category #{fabricCategory.id}
            </Typography>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <InfoEntry label="Name" content={fabricCategory.name} />
              </div>
              <div className="flex flex-col">
                <InfoEntry
                  label="Orderd quantity"
                  content={`${fabricCategory.quantity} bolts`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

/* Order info */

export interface OrderInfoCardProps {
  order: IOrder;
}

const OrderInfoCard: FC<OrderInfoCardProps> = ({ order }) => {
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
                <InfoEntry
                  label="Created on"
                  content={order.createdOn.toDateString()}
                />
                <InfoEntry label="Made by" content={order.author.name} />
                <InfoEntry label="In-charge staff" content={order.staff.name} />
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
                  <InfoEntry label="Cancel reason" content={order.reason} />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const InfoEntry = ({
  label,
  content,
}: {
  label: string;
  content: string | null;
}) => {
  return (
    <div className="flex gap-2">
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {label}:
      </Typography>
      <Typography variant="subtitle1">{content}</Typography>
    </div>
  );
};
