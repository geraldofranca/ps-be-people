import { z } from 'zod';

export const UpdatePersonSchema = z
  .object({
    name: z.string().min(1).optional(),
    document: z.string().min(5).optional(),
    documentType: z.enum(['CPF', 'CNPJ', 'RG']).optional(),
    email: z.string().email().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided',
  );
export type UpdatePersonDto = z.infer<typeof UpdatePersonSchema>;
