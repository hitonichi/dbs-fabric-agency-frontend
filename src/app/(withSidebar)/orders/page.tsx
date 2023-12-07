'use client';

import { TableCellProps, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TableComponent from '../../../components/TableComponent';
import { IOrderData } from '../../api/orders/type';
import ComboboxFilter from '../../../components/ComboboxFilter';
import { toCurrencyString } from '../../../utils/strings';

interface OrderColumn {
  id: 'lastUpdated' | 'customerName' | 'staffName' | 'status' | 'totalPrice';
  label: string;
  minWidth?: number;
  align?: TableCellProps['align'];
  format?: (value: number | string) => string;
}

const columns: readonly OrderColumn[] = [
  {
    id: 'lastUpdated',
    label: 'Last Updated',
    minWidth: 200,
    format: (value: string) => value.split('.')[0],
  },
  {
    id: 'customerName',
    label: 'Customer Name',
    minWidth: 200,
    align: 'left',
    // format: (value: number) => value.toFixed(2),
  },
  {
    id: 'staffName',
    label: 'Staff Name',
    minWidth: 200,
    align: 'left',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'totalPrice',
    label: 'Total Price',
    minWidth: 150,
    align: 'center',
    format: toCurrencyString,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'center',
    // format: (value: number) => value.toFixed(2),
  },
];

export default function Page() {
  const [input, setInput] = useState(null);

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [customers, setCustomers] = useState([]);

  // Fetching orders
  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch('/api/orders');
      // const res = await fetch('http://localhost:8080/orders');

      const res = await Promise.all([
        fetch('http://localhost:8080/orders'),
        fetch('http://localhost:8080/customers'),
      ]);
      const data = await Promise.all(res.map((r) => r.json()));

      const mappedOrderData: IOrderData[] = data[0].map((row) => {
        return {
          id: row.OS_Code,
          customerName: row.C_Customer_Name,
          staffName: row.C_Staff_Name,
          lastUpdated: row.OS_Timestamp,
          totalPrice: row.O_Total_Price,
          status: row.OS_Status,
          customerID: row.C_Code,
        } as IOrderData;
      });
      setOrders(mappedOrderData);

      const mappedCustomerData = data[1].map((row) => {
        return {
          ...row,
          label: row.C_FName + ' ' + row.C_LName,
          id: row.C_Code as string,
        };
      });
      setCustomers(mappedCustomerData);
    };
    fetchData();
  }, []);

  // Filtering input
  useEffect(() => {
    console.log('ufx running!', input, orders, filteredOrders);

    if (input)
      setFilteredOrders(orders.filter((o) => o.customerID === input.C_Code));
    else setFilteredOrders(orders);
  }, [input, orders]);

  console.log('got row', orders);

  // const handleSubmitInput = () => {
  //   console.log('submitted', input);
  // };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Customer Order Management
      </Typography>

      <ComboboxFilter
        label="Filter by Customer"
        options={customers}
        input={input}
        setInput={setInput}
      />
      {/* <div className="flex w-full gap-2 items-center">
        <TextField
          id="outlined-basic"
          label="Find by Customer"
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmitInput();
            }
          }}
          size="small"
        />
        <Button
          variant="contained"
          disabled={input === ''}
          onClick={handleSubmitInput}
        >
          Find
        </Button>
      </div> */}

      {/* <OrderList /> */}
      <TableComponent
        columns={columns}
        rows={filteredOrders}
        navigateBasePath={'orders'}
      />
    </div>
  );
}
