import { Controller, Body, Req, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { Request } from 'express';
import { CreatePersonUseCase } from '../../../application/use-cases';
import {
  CreatePersonDto,
  CreatePersonSchema,
} from '../../../domain/dtos/create-person.dto';
import { badRequest, conflict, created } from '../../helpers/http/http-helper';
import { PersonAlreadyExistsException } from 'src/core/exceptions/person.exception';

@Controller('person')
export class CreatePersonController {
  constructor(private readonly usecase: CreatePersonUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(CreatePersonSchema)) dto: CreatePersonDto,
    @Req() req: Request,
  ) {
    try {
      const person = await this.usecase.execute(dto, req.accountId);
      return created(person);
    } catch (err) {
      if (err instanceof PersonAlreadyExistsException)
        return conflict(err.message);
      return badRequest(err.message);
    }
  }
}
