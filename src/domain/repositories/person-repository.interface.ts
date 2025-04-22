import { Person } from '../models/person.model';

export interface IPersonRepository {
  create(data: Person): Promise<Person>;
  update(id: string, accountId: string, data: Partial<Person>): Promise<Person>;
  findById(id: string, accountId: string): Promise<Person | null>;
  findByDocument(accountId: string, document: string): Promise<Person | null>;
}
