import { Controller, Post, Param, Body, Req } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { Request } from 'express';
import {
  CreateEmailSchema,
  CreateEmailDto,
} from '../../../domain/dtos/create-email.dto';
import { CreateEmailUseCase } from '../../../application/use-cases/email/create-email.usecase';
import { badRequest, conflict, created } from '../../helpers/http/http-helper';
import { PhoneAlreadyExistsException } from '../../../core/exceptions/phone.exception';

@Controller('person/:personId/email')
export class CreateEmailPersonController {
  constructor(private readonly usecase: CreateEmailUseCase) {}

  @Post()
  async handle(
    @Param('personId') personId: string,
    @Body(new ZodValidationPipe(CreateEmailSchema)) dto: CreateEmailDto,
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
