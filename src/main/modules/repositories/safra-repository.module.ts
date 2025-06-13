import {
  ICreateSafraRepository,
  IDeleteSafraRepository,
  IFindSafraByIdRepository,
  IListSafrasByFarmIdRepository,
  IUpdateSafraRepository,
} from '#services/protocols/database/safra-repository.js'
import { SafraRepository } from '#infra/database/postgres/safra-repository.service.js'
import { PrismaGatewayModule } from '#main/modules/gateways/prisma-gateway.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaGatewayModule],
  providers: [
    SafraRepository,
    {
      provide: ICreateSafraRepository,
      useExisting: SafraRepository,
    },
    {
      provide: IDeleteSafraRepository,
      useExisting: SafraRepository,
    },
    {
      provide: IListSafrasByFarmIdRepository,
      useExisting: SafraRepository,
    },
    {
      provide: IFindSafraByIdRepository,
      useExisting: SafraRepository,
    },
    {
      provide: IUpdateSafraRepository,
      useExisting: SafraRepository,
    },
  ],
  exports: [
    ICreateSafraRepository,
    IDeleteSafraRepository,
    IListSafrasByFarmIdRepository,
    IFindSafraByIdRepository,
    IUpdateSafraRepository,
    IFindSafraByIdRepository,
  ],
})
export class SafraRepositoryModule {}
