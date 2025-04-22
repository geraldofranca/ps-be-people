import { Module, Global } from '@nestjs/common';
import { PrismaProvider } from './pgsql/prisma/prisma.provider';
import { PersonPrismaRepository } from './pgsql/prisma/repositories/person-prisma.repository';

@Global()
@Module({
  imports: [],
  providers: [PrismaProvider, PersonPrismaRepository],
  exports: [PrismaProvider, PersonPrismaRepository],
})
export class DatabaseModule {}
