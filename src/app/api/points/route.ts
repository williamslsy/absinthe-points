import { auth } from '../auth';
import { prisma } from '@/lib/db';
export async function POST(request: Request): Promise<Response> {
  const data = await request.json();
  // request should have address, eventname and points
  if (!data.address || !data.eventName || !data.points) {
    return new Response(JSON.stringify({ message: 'Address, eventname and points are required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { p: project, err } = await auth(request);
  if (err) {
    return err;
  }

  if (!project) {
    throw new Error('Project not found');
  }

  // find or create event
  const event = await prisma.events.upsert({
    where: {
      name_project_id: {
        project_id: project.id,
        name: data.eventName,
      },
    },
    update: {},
    create: {
      name: data.eventName,
      project_id: project.id,
      created_at: new Date(),
    },
  });

  // upsert points
  const points = await prisma.points.upsert({
    where: {
      event_id_project_id_address: {
        event_id: event.id,
        project_id: project.id,
        address: data.address,
      },
    },
    update: {
      points: data.points,
    },
    create: {
      event_id: event.id,
      address: data.address,
      points: data.points,
      project_id: project.id,
    },
  });

  return new Response(JSON.stringify({ message: 'Data received', points }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
