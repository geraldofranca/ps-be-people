import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../prisma.provider';
import { IPersonRepository } from 'src/domain/repositories/person-repository.interface';
import { Person } from 'src/domain/models/person.model';

@Injectable()
export class PersonPrismaRepository implements IPersonRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  async create(data: Person): Promise<Person> {
    return this.prisma.person.create({ data });
  }

  async update(
    id: string,
    accountId: string,
    data: Partial<Person>,
  ): Promise<Person> {
    return this.prisma.person.update({
      where: { id_accountId: { id, accountId } },
      data,
    });
  }

  async findById(id: string, accountId: string): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: { id_accountId: { id, accountId } },
    });
  }

  async findByDocument(
    accountId: string,
    document: string,
  ): Promise<Person | null> {
    return this.prisma.person.findFirst({
      where: { accountId, document },
    });
  }
}
