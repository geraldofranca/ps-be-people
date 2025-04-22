import { Inject } from '@nestjs/common';
import { PersonNotFoundException } from '../../../core/exceptions/person.exception';
import {
  UpdatePersonDto,
  UpdatePersonSchema,
} from '../../../domain/dtos/update-person.dto';
import { IPersonRepository } from '../../../domain/repositories/person-repository.interface';

export class UpdatePersonUseCase {
  constructor(
    @Inject('IPersonRepository')
    private readonly repo: IPersonRepository,
  ) {}

  async execute(id: string, input: UpdatePersonDto, accountId: string) {
    const data = UpdatePersonSchema.parse(input);
    const person = await this.repo.findById(id, accountId);
    if (!person) throw new PersonNotFoundException(id);

    return this.repo.update(id, accountId, data);
  }
}
