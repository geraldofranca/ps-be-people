import { Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  CreateAddressDto,
  CreateAddressSchema,
} from '../../../domain/dtos/create-address.dto';
import { IPersonAddressRepository } from '../../../domain/repositories/address-repository.interface';
import { PersonAddress } from '../../../domain/models/address.model';
import { AddressAlreadyExistsException } from 'src/core/exceptions/address.exception';

export class CreateAddressUseCase {
  constructor(
    @Inject('IPersonAddressRepository')
    private repo: IPersonAddressRepository,
  ) {}

  async execute(input: CreateAddressDto, personId: string, accountId: string) {
    const data = CreateAddressSchema.parse(input);
    const exists = await this.repo
      .listByPerson(personId, accountId)
      .then((list) =>
        list.find((a) => a.street === data.street && a.number === data.number),
      );
    if (exists)
      throw new AddressAlreadyExistsException(data.street, data.number);

    const address: PersonAddress = {
      id: uuid(),
      personId,
      accountId,
      type: data.type || 'OTHER',
      street: data.street || '',
      number: data.number || '',
      neighborhood: data.neighborhood || '',
      createdAt: new Date(),
      city: data.city ?? '',
      state: data.state ?? '',
      postalCode: data.postalCode ?? '',
    };
    console.log(address);
    return this.repo.create(address);
  }
}
