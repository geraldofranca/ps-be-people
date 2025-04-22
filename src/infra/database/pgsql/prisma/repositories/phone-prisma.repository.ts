import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../prisma.provider';
import { IPersonPhoneRepository } from '../../../../../domain/repositories/phone-repository.interface';
import { PersonPhone } from '../../../../../domain/models/phone.model';

@Injectable()
export class PhonePrismaRepository implements IPersonPhoneRepository {
  constructor(private prisma: PrismaProvider) {}

  async create(p: PersonPhone) {
    return this.prisma.personPhone.create({ data: p });
  }
  async update(id: string, accountId: string, data: Partial<PersonPhone>) {
    return this.prisma.personPhone.update({
      where: { id_accountId: { id, accountId } },
      data,
    });
  }
  async findById(id: string, accountId: string) {
    return this.prisma.personPhone.findUnique({
      where: { id_accountId: { id, accountId } },
    });
  }
  async listByPerson(personId: string, accountId: string) {
    return this.prisma.personPhone.findMany({ where: { personId, accountId } });
  }
  async delete(id: string, accountId: string) {
    await this.prisma.personPhone.delete({
      where: { id_accountId: { id, accountId } },
    });
  }
}
