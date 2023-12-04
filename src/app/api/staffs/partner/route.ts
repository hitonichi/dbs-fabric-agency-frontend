import { mapEmployee } from '../../../../utils/mappings';

export async function GET() {
  const res = await fetch(process.env.BACKEND_BASE_URL + '/staffs/partner', {
    cache: 'no-store',
  });
  const data = await res.json();

  console.log('[API] data', res, data, data.length);

  const mappedData = mapEmployee(data);
  return Response.json({ data: mappedData });
}
