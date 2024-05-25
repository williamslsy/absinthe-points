import { z } from 'zod';

export const formSchema = z.object({
  apiKey: z.string().uuid({ message: 'API Key must be a valid UUID' }),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Address must be a valid wallet address' }),
  eventName: z.string().min(3, { message: 'Event name must be at least 3 characters long' }),
  points: z.preprocess((arg) => {
    const parsed = parseInt(arg as string, 10);
    return isNaN(parsed) ? arg : parsed;
  }, z.number().min(10, { message: 'Points must be greater than 10' })),
});
