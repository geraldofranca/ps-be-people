export type PhoneType = 'FIXED' | 'MOBILE' | 'MESSAGE' | 'OTHER';

export interface PersonPhone {
  id: string;
  personId: string;
  accountId: string;
  type: PhoneType;
  number: string;
  createdAt: Date;
}
