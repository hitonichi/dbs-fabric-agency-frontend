'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import OrderInfoCard from '../../../../components/orderInfomation/OrderInfoCard';
import PaymentInfoCard from '../../../../components/orderInfomation/PaymentInfoCard';
import { IOrderPayment } from '../../../../components/orderInfomation/PaymentInfoCard/types';
import { mapOrderBolt, mapOrderInfo } from '../../../../utils/mappings';
import FabricInfoCard from '../../../../components/orderInfomation/FabricInfoCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

function allyProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

  const [orderInfo, setOrderInfo] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch(`http://localhost:8080/orders/${params.slug}`);
      // const data = await res.json();

      const res = await Promise.all([
        fetch(`http://localhost:8080/orders/`),
        fetch(`http://localhost:8080/bolts/${params.slug}`),
        fetch(`http://localhost:8080/payments/${params.slug}`),
      ]);
      const [orderData, boltData, paymentData] = await Promise.all(
        res.map((r) => r.json())
      );

      console.log(
        '[Order INFO] got data',
        orderData.find((o) => o.OS_Code === params.slug),
        boltData,
        paymentData
      );

      setOrderInfo(
        mapOrderInfo(orderData.find((o) => o.OS_Code === params.slug))
      );
      setCategoryInfo(mapOrderBolt(boltData));
      setPaymentInfo(
        paymentData.map(
          (p) =>
            ({
              orderID: p.OP_Order_Code,
              amount: p.OP_Amount,
              customerID: p.OP_Customer_Code,
              timestamp: p.OP_Date + ' ' + p.OP_Time,
            }) as IOrderPayment
        )
      );
    };
    fetchData();
  }, []);

  const [tabValue, setTabValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <div>Order info: ID - {params.slug}</div> */}
      {/* <TabContext value={value}> */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="lab API tabs example"
          centered
        >
          <Tab label="Overview" {...allyProps(0)} />
          <Tab label="Category Information" {...allyProps(1)} />
          <Tab label="Payment History" {...allyProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        <OrderInfoCard order={orderInfo} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <FabricInfoCard bolts={categoryInfo} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <PaymentInfoCard payments={paymentInfo} />
      </CustomTabPanel>
      {/* </TabContext> */}
    </div>
  );
}

/* Category info */
