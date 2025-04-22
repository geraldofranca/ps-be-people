import { z } from 'zod';

export const CreatePhoneSchema = z.object({
  type: z.enum(['FIXED', 'MOBILE', 'MESSAGE', 'OTHER']),
  number: z
    .string()
    .regex(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      'Phone must follow (DD) 9999-9999 or (DD) 99999-9999',
    ),
});
export type CreatePhoneDto = z.infer<typeof CreatePhoneSchema>;
