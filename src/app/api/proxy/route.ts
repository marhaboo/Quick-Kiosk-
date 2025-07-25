export async function GET(request: Request) {
  const res = await fetch('http://45.153.68.77:5001/api'); 
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}