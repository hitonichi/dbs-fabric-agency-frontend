import { mapFabricCategory } from './../../../utils/mappings';
export async function GET() {
  const res = await fetch(process.env.BACKEND_BASE_URL + '/categories', {
    cache: 'no-store',
  });
  const data = await res.json();

  const mappedData = mapFabricCategory(data);

  console.log('[API] data', res, data, data.length);
  return Response.json({ data: mappedData });
}
