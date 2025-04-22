import { Inject } from '@nestjs/common';
import { IPersonAddressRepository } from '../../../domain/repositories/address-repository.interface';
import { AddressNotFoundException } from '../../../core/exceptions/address.exception';

export class FetchAddressByPersonUseCase {
  constructor(
    @Inject('IPersonAddressRepository')
    private readonly repo: IPersonAddressRepository,
  ) {}

  async execute(id: string, accountId: string) {
    const person = await this.repo.listByPerson(id, accountId);
    if (!person) throw new AddressNotFoundException(id);
    return person;
  }
}
