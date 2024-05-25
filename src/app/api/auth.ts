import { Projects } from '@prisma/client';
import { prisma } from '@/lib/db';

export const auth = async (request: Request): Promise<{ p?: Projects; err?: Response }> => {
  // ensure api_key is set as bearer token and is valid
  const auth = request.headers.get('Authorization') || '';
  const token = auth.split('Bearer ')[1];
  if (!token) {
    return {
      err: new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    };
  }
  // get project from db using api_key
  const project = await prisma.projects.findFirst({
    where: {
      api_key: token,
    },
  });

  if (!project) {
    return {
      err: new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    };
  }

  return { p: project };
};
