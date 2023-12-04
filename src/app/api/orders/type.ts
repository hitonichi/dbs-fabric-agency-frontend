export enum OrderStatus {
  new = 'New',
  ordered = 'Ordered',
  partial = 'Partial Paid',
  full = 'Full Paid',
  cancelled = 'Cancelled',
}

export interface IOrderData {
  id: string;
  customerName: string;
  staffName: string;
  totalPrice: number;
  status: string;
  lastUpdated: string;
}
