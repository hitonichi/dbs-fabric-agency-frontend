export async function GET() {
  const res = await fetch(process.env.BACKEND_BASE_URL + '/suppliers');
  const data = await res.json();

  console.log('[API] data', res, data, data.length);

  // const mappedData = mapSupplier(data);
  // return Response.json({ data: mappedData });

  return Response.json({});
}
