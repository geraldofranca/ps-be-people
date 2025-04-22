import { z } from 'zod';

export const CreateAddressSchema = z.object({
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'OTHER']),
  street: z.string().min(1, 'Street cannot be empty'),
  number: z.string().min(1, 'Number cannot be empty'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Neighborhood cannot be empty'),
  city: z.string().min(1, 'City cannot be empty'),
  state: z
    .string()
    .length(2, 'State must be two-letter code (e.g. SP)')
    .regex(/^[A-Z]{2}$/, 'State must be uppercase letters'),
  postalCode: z
    .string()
    .regex(/^\d{5}-\d{3}$/, 'PostalCode must follow 99999-999 format'),
});
export type CreateAddressDto = z.infer<typeof CreateAddressSchema>;
