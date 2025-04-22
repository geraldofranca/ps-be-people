import { Controller, Req, Get, Param } from '@nestjs/common';
import { Request } from 'express';
import { GetPersonUseCase } from '../../../application/use-cases';
import { badRequest, notFound, ok } from '../../helpers/http/http-helper';
import { PersonNotFoundException } from '../../../core/exceptions/person.exception';

@Controller('person')
export class FetchPersonByIdPersonController {
  constructor(private readonly usecase: GetPersonUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string, @Req() req: Request) {
    try {
      const person = await this.usecase.execute(id, req.accountId);
      return ok(person);
    } catch (err) {
      if (err instanceof PersonNotFoundException) return notFound(err.message);
      return badRequest(err.message);
    }
  }
}
