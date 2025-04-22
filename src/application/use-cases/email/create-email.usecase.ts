import { Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PhoneAlreadyExistsException } from '../../../core/exceptions/phone.exception';
import {
  CreateEmailDto,
  CreateEmailSchema,
} from '../../../domain/dtos/create-email.dto';
import { IPersonEmailRepository } from '../../../domain/repositories/email-repository.interface';
import { PersonEmail } from '../../../domain/models/email.model';

export class CreateEmailUseCase {
  constructor(
    @Inject('IPersonEmailRepository')
    private repo: IPersonEmailRepository,
  ) {}

  async execute(input: CreateEmailDto, personId: string, accountId: string) {
    const data = CreateEmailSchema.parse(input);
    const exists = await this.repo
      .listByPerson(personId, accountId)
      .then((list) => list.find((p) => p.email === data.email));
    if (exists) throw new PhoneAlreadyExistsException(data.email);

    const email: PersonEmail = {
      id: uuid(),
      personId,
      accountId,
      email: data.email!,
      type: data.type!,
      createdAt: new Date(),
    };

    return this.repo.create(email);
  }
}
