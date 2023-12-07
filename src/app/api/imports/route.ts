import { mapImport } from './../../../utils/mappings';
export async function POST(req: Request) {
  const body = await req.json();
  console.log('got body', body, req.body);

  const request = new Request(process.env.BACKEND_BASE_URL + '/imports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(body),
  });

  const res = await fetch(request);

  if (res.ok) {
    const { data } = await res.json();
    const mappedData = mapImport(data);

    console.log('[Route handler] data', res, data, data.length);
    return Response.json({ data: mappedData });
  } else {
    console.error('[Route handler] error', res);
    return Response.json(
      { message: 'error occured' },
      { status: res.status, statusText: res.statusText }
    );
  }
}
