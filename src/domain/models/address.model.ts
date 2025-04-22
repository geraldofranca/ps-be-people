export type AddressType = 'RESIDENTIAL' | 'COMMERCIAL' | 'OTHER';

export interface PersonAddress {
  id: string;
  personId: string;
  accountId: string;
  type: AddressType;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt: Date;
  updatedAt?: Date;
}
