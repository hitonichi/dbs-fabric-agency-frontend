import { IOrderData } from './type';

export async function GET() {
  const res = await fetch(process.env.BACKEND_BASE_URL + '/orders');
  const data = await res.json();

  console.log('[API] data', res, data, data.length);

  const mappedData: IOrderData[] = data.map((row) => {
    return {
      id: row.C_Code,
      customerName: row.C_FName + row.C_LName,
      staffName: row.E_FName + row.E_LName,
      lastUpdated: row.OS_Date + ' ' + row.OS_Time,
    } as IOrderData;
  });

  return Response.json({ mappedData });
  // return Response.json({ data });
}
