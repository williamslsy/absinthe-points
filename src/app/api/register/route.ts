import { prisma } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request): Promise<Response> {
  const data = await request.json();
  if (!data.name) {
    return new Response(JSON.stringify({ message: 'Name is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  // insert name to db using prisma
  const project = await prisma.projects.create({
    data: {
      name: data.name,
      api_key: uuidv4(),
      created_at: new Date(),
    },
  });
  return new Response(JSON.stringify({ message: 'Data received', project }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
