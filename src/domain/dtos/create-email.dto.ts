import { z } from 'zod';

export const CreateEmailSchema = z.object({
  type: z.enum(['PERSONAL', 'COMMERCIAL', 'OTHER']),
  email: z.string().email('Invalid email format'),
});
export type CreateEmailDto = z.infer<typeof CreateEmailSchema>;
