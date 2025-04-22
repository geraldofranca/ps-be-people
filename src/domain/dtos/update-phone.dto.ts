import { z } from 'zod';
import { CreatePhoneSchema } from './create-phone.dto';

export const UpdatePhoneSchema = CreatePhoneSchema.partial().refine(
  (d) => Object.keys(d).length > 0,
  'At least one field',
);
export type UpdatePhoneDto = z.infer<typeof UpdatePhoneSchema>;
