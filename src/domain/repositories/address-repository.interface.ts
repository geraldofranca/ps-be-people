import { PersonAddress } from '../models/address.model';

export interface IPersonAddressRepository {
  create(address: PersonAddress): Promise<PersonAddress>;
  update(
    id: string,
    accountId: string,
    data: Partial<PersonAddress>,
  ): Promise<PersonAddress>;
  findById(id: string, accountId: string): Promise<PersonAddress | null>;
  listByPerson(personId: string, accountId: string): Promise<PersonAddress[]>;
  delete(id: string, accountId: string): Promise<void>;
}
