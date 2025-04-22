import { Inject } from '@nestjs/common';
import { IPersonRepository } from '../../../domain/repositories/person-repository.interface';

export class ListPersonsUseCase {
  constructor(
    @Inject('IPersonRepository')
    private readonly repo: IPersonRepository,
  ) {}

  async execute(document: string, accountId: string) {
    return this.repo.findByDocument(accountId, document)
      ? [await this.repo.findByDocument(accountId, document)!]
      : [];
  }
}
