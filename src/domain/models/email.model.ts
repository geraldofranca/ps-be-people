export type EmailType = 'PERSONAL' | 'COMMERCIAL' | 'OTHER';

export interface PersonEmail {
  id: string;
  personId: string;
  accountId: string;
  type: EmailType;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}
