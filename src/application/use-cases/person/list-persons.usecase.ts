import { Inject } from '@nestjs/common';
import { IPersonRepository } from '../../../domain/repositories/person-repository.interface';

export class ListPersonsUseCase {
  constructor(
    @Inject('IPersonRepository')
    private readonly repo: IPersonRepository,
  ) {}

  async execute(document: string, accountId: string) {
    const person = await this.repo.findByDocument(accountId, document);
    return person ? [person] : [];
  }
}
