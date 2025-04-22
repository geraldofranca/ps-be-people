import { v4 as uuid } from 'uuid';
import {
  CreatePersonDto,
  CreatePersonSchema,
} from '../../../domain/dtos/create-person.dto';
import { IPersonRepository } from '../../../domain/repositories/person-repository.interface';
import { PersonAlreadyExistsException } from '../../../core/exceptions/person.exception';
import { Inject } from '@nestjs/common';

export class CreatePersonUseCase {
  constructor(
    @Inject('IPersonRepository')
    private readonly repo: IPersonRepository,
  ) {}

  async execute(input: CreatePersonDto, accountId: string) {
    const data = CreatePersonSchema.parse(input);
    const exists = await this.repo.findByDocument(accountId, data.document);
    if (exists) throw new PersonAlreadyExistsException(data.document);

    const person = await this.repo.create({
      id: uuid(),
      name: data.name,
      document: data.document,
      documentType: data.documentType,
      email: data.email,
      accountId,
      createdAt: new Date(),
    });
    return person;
  }
}
