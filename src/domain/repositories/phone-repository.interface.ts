import { PersonPhone } from '../models/phone.model';

export interface IPersonPhoneRepository {
  create(phone: PersonPhone): Promise<PersonPhone>;
  update(
    id: string,
    accountId: string,
    data: Partial<PersonPhone>,
  ): Promise<PersonPhone>;
  findById(id: string, accountId: string): Promise<PersonPhone | null>;
  listByPerson(personId: string, accountId: string): Promise<PersonPhone[]>;
  delete(id: string, accountId: string): Promise<void>;
}
