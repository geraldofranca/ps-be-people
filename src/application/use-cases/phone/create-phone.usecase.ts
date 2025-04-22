import { Inject } from '@nestjs/common';
import { PhoneAlreadyExistsException } from '../../../core/exceptions/phone.exception';
import {
  CreatePhoneDto,
  CreatePhoneSchema,
} from '../../../domain/dtos/create-phone.dto';
import { PersonPhone } from '../../../domain/models/phone.model';
import { IPersonPhoneRepository } from '../../../domain/repositories/phone-repository.interface';
import { v4 as uuid } from 'uuid';

export class CreatePhoneUseCase {
  constructor(
    @Inject('IPersonPhoneRepository')
    private repo: IPersonPhoneRepository,
  ) {}

  async execute(input: CreatePhoneDto, personId: string, accountId: string) {
    const data = CreatePhoneSchema.parse(input);
    const exists = await this.repo
      .listByPerson(personId, accountId)
      .then((list) => list.find((p) => p.number === data.number));
    if (exists) throw new PhoneAlreadyExistsException(data.number);

    const phone: PersonPhone = {
      id: uuid(),
      personId,
      accountId,
      number: data.number!,
      type: data.type!,
      createdAt: new Date(),
    };

    return this.repo.create(phone);
  }
}
