import { mapSupplier } from '../../../utils/mappings';

export async function GET() {
  const res = await fetch(process.env.BACKEND_BASE_URL + '/suppliers');
  const data = await res.json();

  console.log('[API] data', res, data, data.length);

  const mappedData = mapSupplier(data);
  return Response.json({ data: mappedData });
}

export async function POST(req: Request) {
  // const body = JSON.stringify(req.body);
  const body = await req.json();
  console.log('got body', body, req.body);
  const request = new Request(process.env.BACKEND_BASE_URL + '/suppliers', {
    method: 'POST',
    // cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    // duplex: true,
  });
  const res = await fetch(request);
  if (res.ok) {
    const data = await res.json();

    console.log('[API] data', res, data, data.length);

    // const mappedData = mapSupplier(data);
    return Response.json({ data });
  } else {
    console.log('res in error', res);
    return Response.json(
      { type: 'PHONE_EXISTED', existedPhones: ['12', '123'] },
      { status: 400 }
    );
    // return new Response(new Blob(), {
    //   status: 400,
    //   statusText: 'Phone number existed',
    // }).json({existedPhones: ['12', '123']});
  }
}
