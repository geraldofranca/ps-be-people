export type DocumentType = 'CPF' | 'CNPJ' | 'RG';

export interface Person {
  id: string;
  accountId: string;
  name: string;
  document: string;
  documentType: DocumentType;
  email?: string;
  createdAt: Date;
  updatedAt?: Date;
}
