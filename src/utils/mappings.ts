import { IFabricCategoryData } from '../app/api/fabric/types';
import { IImportData } from '../app/api/imports/types';
import { IEmployeeData } from '../app/api/staffs/partner/types';
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

export const mapEmployee = (employees) => {
  if (!employees || employees.length == 0) return [];
  return employees.map(
    (e) =>
      ({
        id: e.E_Code,
        name: e.E_FName + e.E_LName,
        gender: e.E_Gender,
        address: e.E_Address,
        type: e.E_Type,
      }) as IEmployeeData
  );
};

export const mapImport = (imports) => {
  if (!imports || imports.length == 0) return [];
  return imports.map(
    (i) =>
      ({
        category: i.Category,
        date: i.Date,
        quantity: i.Quantity,
        price: i.Price,
        supplierID: i.Supplier_ID,
        supplierName: i.Supplier_Name,
        phone: i.Supplier_Phones,
      }) as IImportData
  );
};
