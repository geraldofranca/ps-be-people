import { Module } from '@nestjs/common';
import { PersonPrismaRepository } from '../../infra/database/pgsql/prisma/repositories/person-prisma.repository';
import { SnsEventPublisherService } from '../../infra/cloud/aws/event-publisher/sns-event-publisher.service';
import {
  CreatePersonUseCase,
  UpdatePersonUseCase,
  GetPersonUseCase,
  ListPersonsUseCase,
  CreateAddressUseCase,
  CreatePhoneUseCase,
  FetchAddressByPersonUseCase,
} from '../use-cases';
import {
  CreateAddressPersonController,
  CreateEmailPersonController,
  CreatePersonController,
  CreatePhonePersonController,
  FetchAddressByPersonController,
  FetchPersonByIdDocumentController,
  FetchPersonByIdPersonController,
} from '../../presentation/controllers';
import { DatabaseModule } from '../../infra/database/database.module';
import { AddressPrismaRepository } from '../../infra/database/pgsql/prisma/repositories/address-prisma.repository';
import { PhonePrismaRepository } from '../../infra/database/pgsql/prisma/repositories/phone-prisma.repository';
import { CreateEmailUseCase } from '../use-cases/email/create-email.usecase';
import { EmailPrismaRepository } from '../../infra/database/pgsql/prisma/repositories/email-prisma.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreatePersonController,
    FetchPersonByIdPersonController,
    FetchPersonByIdDocumentController,
    FetchAddressByPersonController,
    CreateAddressPersonController,
    CreatePhonePersonController,
    CreateEmailPersonController,
  ],
  providers: [
    { provide: 'IPersonRepository', useClass: PersonPrismaRepository },
    { provide: 'IPersonAddressRepository', useClass: AddressPrismaRepository },
    { provide: 'IPersonPhoneRepository', useClass: PhonePrismaRepository },
    { provide: 'IPersonEmailRepository', useClass: EmailPrismaRepository },
    { provide: 'IEventPublisher', useClass: SnsEventPublisherService },
    CreatePersonUseCase,
    UpdatePersonUseCase,
    GetPersonUseCase,
    ListPersonsUseCase,
    CreateAddressUseCase,
    CreatePhoneUseCase,
    FetchAddressByPersonUseCase,
    CreateEmailUseCase,
  ],
})
export class PersonModule {}
