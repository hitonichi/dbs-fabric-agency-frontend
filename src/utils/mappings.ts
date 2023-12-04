import { IFabricCategoryData } from '../app/api/fabric/types';
import { ISupplierData } from '../app/api/suppliers/types';
import { IFabricCategory } from '../components/orderInfomation/FabricInfoCard/types';

export const mapOrderInfo = (order) => {
  if (!order) return null;
  return {
    id: order.OS_Code,
    customerName: order.C_Customer_Name,
    staffName: order.C_Staff_Name,
    status: order.OS_Status,
    lastUpdated: order.OS_Timestamp,
    totalPrice: order.O_Total_Price,
    cancelReason: order.OS_Cancel_Reason || null,
  };
};

export const mapOrderBolt = (boltData) => {
  if (boltData.length == 0) return [];
  return boltData.map(
    (b) =>
      ({
        category: b.F_Name,
        color: b.F_Color,
        length: b.B_Length,
        price: b.FCP_Price,
      }) as IFabricCategory
  );
};

export const mapFabricCategory = (categoryData) => {
  console.log('mapping', categoryData);
  if (categoryData.length == 0) return [];
  return categoryData.map(
    (c) =>
      ({
        id: c.FCP_Category_Code,
        lastUpdated: c.FCP_Date,
        price: c.FCP_Price,
        color: c.F_Color,
        category: c.F_Name,
        quantity: c.F_Quantity,
        supplierID: c.S_Code,
        supplierName: c.S_Name,
      }) as IFabricCategoryData
  );
};

export const mapSupplier = (suppliers) => {
  if (!suppliers || suppliers.length == 0) return [];
  return suppliers.map(
    (s) =>
      ({
        id: s.S_Code,
        name: s.S_Name,
        address: s.S_Address,
        taxCode: s.S_Taxcode,
        bankAccount: s.S_BankAccount,
        staffID: s.S_Pstaff_Code,
      }) as ISupplierData
  );
};
