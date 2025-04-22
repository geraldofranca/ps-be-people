import { Controller, Post, Param, Body, Req } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { Request } from 'express';
import {
  CreatePhoneSchema,
  CreatePhoneDto,
} from '../../../domain/dtos/create-phone.dto';
import { CreatePhoneUseCase } from '../../../application/use-cases/phone/create-phone.usecase';
import { badRequest, conflict, created } from '../../helpers/http/http-helper';
import { PhoneAlreadyExistsException } from '../../../core/exceptions/phone.exception';

@Controller('person/:personId/phone')
export class CreatePhonePersonController {
  constructor(private readonly usecase: CreatePhoneUseCase) {}

  @Post()
  async handle(
    @Param('personId') personId: string,
    @Body(new ZodValidationPipe(CreatePhoneSchema)) dto: CreatePhoneDto,
    @Req() req: Request,
  ) {
    try {
      const addr = await this.usecase.execute(dto, personId, req.accountId);
      return created(addr);
    } catch (err) {
      console.log(err);
      if (err instanceof PhoneAlreadyExistsException)
        return conflict(err.message);
      return badRequest(err.message);
    }
  }
}
