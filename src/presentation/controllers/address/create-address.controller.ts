import { Controller, Post, Param, Body, Req } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { Request } from 'express';
import {
  CreateAddressSchema,
  CreateAddressDto,
} from '../../../domain/dtos/create-address.dto';
import { CreateAddressUseCase } from '../../../application/use-cases/address/create-address.usecase';
import { badRequest, conflict, created } from '../../helpers/http/http-helper';
import { AddressAlreadyExistsException } from '../../../core/exceptions/address.exception';

@Controller('person/:personId/address')
export class CreateAddressPersonController {
  constructor(private readonly usecase: CreateAddressUseCase) {}

  @Post()
  async handle(
    @Param('personId') personId: string,
    @Body(new ZodValidationPipe(CreateAddressSchema)) dto: CreateAddressDto,
    @Req() req: Request,
  ) {
    try {
      const addr = await this.usecase.execute(dto, personId, req.accountId);
      return created(addr);
    } catch (err) {
      if (err instanceof AddressAlreadyExistsException)
        return conflict(err.message);
      return badRequest(err.message);
    }
  }
}
