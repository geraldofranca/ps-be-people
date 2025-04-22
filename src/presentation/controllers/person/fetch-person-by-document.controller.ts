import { Controller, Req, Get, Query } from '@nestjs/common';
import { Request } from 'express';
import { ListPersonsUseCase } from '../../../application/use-cases';
import { ok, serverError } from '../../helpers/http/http-helper';

@Controller('person')
export class FetchPersonByIdDocumentController {
  constructor(private readonly usecase: ListPersonsUseCase) {}

  @Get()
  async handle(@Query('document') document: string, @Req() req: Request) {
    try {
      const list = await this.usecase.execute(document, req.accountId);
      return ok(list);
    } catch (err) {
      return serverError();
    }
  }
}
