import { z } from 'zod';
import { CreateAddressSchema } from './create-address.dto';

export const UpdateAddressSchema = CreateAddressSchema.partial().refine(
  (d) => Object.keys(d).length > 0,
  'At least one field',
);
export type UpdateAddressDto = z.infer<typeof UpdateAddressSchema>;
