import { IPersonRepository } from '../../../domain/repositories/person-repository.interface';
import { PersonNotFoundException } from '../../../core/exceptions/person.exception';
import { Inject } from '@nestjs/common';

export class GetPersonUseCase {
  constructor(
    @Inject('IPersonRepository')
    private readonly repo: IPersonRepository,
  ) {}

  async execute(id: string, accountId: string) {
    const person = await this.repo.findById(id, accountId);
    if (!person) throw new PersonNotFoundException(id);
    return person;
  }
}
