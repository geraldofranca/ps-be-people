import { PersonEmail } from '../models/email.model';

export interface IPersonEmailRepository {
  create(phone: PersonEmail): Promise<PersonEmail>;
  update(
    id: string,
    accountId: string,
    data: Partial<PersonEmail>,
  ): Promise<PersonEmail>;
  findById(id: string, accountId: string): Promise<PersonEmail | null>;
  listByPerson(personId: string, accountId: string): Promise<PersonEmail[]>;
  delete(id: string, accountId: string): Promise<void>;
}
