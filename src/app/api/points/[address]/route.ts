import { auth } from '../../auth';
import { prisma } from '@/lib/db';

export async function GET(request: Request): Promise<Response> {
  // get the points for a specific address
  // get the points for a specific address filtered by eventName
  // Store the points data in a postgres instance
  const { p: project, err } = await auth(request);
  if (err) {
    return err;
  }

  if (!project) {
    throw new Error('Project not found');
  }
  const address = request.url.split('/').pop()?.split('?')[0];

  const eventName = new URL(request.url).searchParams.get('eventName');

  if (eventName) {
    const event = await prisma.events.findFirst({
      where: {
        project_id: project.id,
        name: eventName,
      },
    });
    if (!event) {
      return new Response(JSON.stringify({ message: 'Event not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const points = await prisma.points.findMany({
      where: {
        event_id: event.id,
        project_id: project.id,
        address: address,
      },
      include: {
        event: true,
      },
    });
    return new Response(
      JSON.stringify({
        message: 'Points fetched successfully',
        points,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } else {
    const points = await prisma.points.findMany({
      where: {
        project_id: project.id,
        address: address,
      },
      include: {
        event: true,
      },
    });
    return new Response(
      JSON.stringify({
        message: 'Points fetched successfully',
        points,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
