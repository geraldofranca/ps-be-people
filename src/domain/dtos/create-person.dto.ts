import { z } from 'zod';

export const CreatePersonSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  document: z.string().min(5, 'Document too short'),
  documentType: z.enum(['CPF', 'CNPJ', 'RG']),
  email: z.string().email().optional(),
});
export type CreatePersonDto = z.infer<typeof CreatePersonSchema>;
