import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../prisma.provider';
import { IPersonEmailRepository } from '../../../../../domain/repositories/email-repository.interface';
import { PersonEmail } from '../../../../../domain/models/email.model';

@Injectable()
export class EmailPrismaRepository implements IPersonEmailRepository {
  constructor(private prisma: PrismaProvider) {}

  async create(p: PersonEmail) {
    return this.prisma.personEmail.create({ data: p });
  }
  async update(id: string, accountId: string, data: Partial<PersonEmail>) {
    return this.prisma.personEmail.update({
      where: { id_accountId: { id, accountId } },
      data,
    });
  }
  async findById(id: string, accountId: string) {
    return this.prisma.personEmail.findUnique({
      where: { id_accountId: { id, accountId } },
    });
  }
  async listByPerson(personId: string, accountId: string) {
    return this.prisma.personEmail.findMany({ where: { personId, accountId } });
  }
  async delete(id: string, accountId: string) {
    await this.prisma.personEmail.delete({
      where: { id_accountId: { id, accountId } },
    });
  }
}
