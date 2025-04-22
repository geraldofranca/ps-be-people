import { Controller, Param, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { badRequest, conflict, ok } from '../../helpers/http/http-helper';
import { AddressNotFoundException } from '../../../core/exceptions/address.exception';
import { FetchAddressByPersonUseCase } from 'src/application/use-cases/address/fetch-address-by-person.usecase';

@Controller('person/:personId/address')
export class FetchAddressByPersonController {
  constructor(private readonly usecase: FetchAddressByPersonUseCase) {}

  @Get()
  async handle(@Param('personId') personId: string, @Req() req: Request) {
    try {
      const list = await this.usecase.execute(personId, req.accountId);
      return ok(list);
    } catch (err) {
      if (err instanceof AddressNotFoundException) return conflict(err.message);
      return badRequest(err.message);
    }
  }
}
