import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../prisma.provider';
import { IPersonAddressRepository } from 'src/domain/repositories/address-repository.interface';
import { PersonAddress } from '@prisma/client';

@Injectable()
export class AddressPrismaRepository implements IPersonAddressRepository {
  constructor(private prisma: PrismaProvider) {}

  async create(a: PersonAddress) {
    return this.prisma.personAddress.create({ data: a });
  }
  async update(id: string, accountId: string, data: Partial<PersonAddress>) {
    return this.prisma.personAddress.update({
      where: { id_accountId: { id, accountId } },
      data,
    });
  }
  async findById(id: string, accountId: string) {
    return this.prisma.personAddress.findUnique({
      where: { id_accountId: { id, accountId } },
    });
  }
  async listByPerson(personId: string, accountId: string) {
    return this.prisma.personAddress.findMany({
      where: { personId, accountId },
    });
  }
  async delete(id: string, accountId: string) {
    await this.prisma.personAddress.delete({
      where: { id_accountId: { id, accountId } },
    });
  }
}
