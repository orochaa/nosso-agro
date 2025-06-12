import {
  ICreateFarmRepository,
  IDeleteFarmRepository,
  IFindFarmByIdRepository,
  IListFarmsByProducerIdRepository,
  IUpdateFarmRepository,
} from '#services/protocols/database/farm-repository.js'
import { FarmRepository } from '#infra/database/postgres/farm-repository.service.js'
import { PrismaGatewayModule } from '#main/modules/gateways/prisma-gateway.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaGatewayModule],
  providers: [
    FarmRepository,
    {
      provide: ICreateFarmRepository,
      useExisting: FarmRepository,
    },
    {
      provide: IDeleteFarmRepository,
      useExisting: FarmRepository,
    },
    {
      provide: IFindFarmByIdRepository,
      useExisting: FarmRepository,
    },
    {
      provide: IListFarmsByProducerIdRepository,
      useExisting: FarmRepository,
    },
    {
      provide: IUpdateFarmRepository,
      useExisting: FarmRepository,
    },
  ],
  exports: [
    ICreateFarmRepository,
    IDeleteFarmRepository,
    IFindFarmByIdRepository,
    IListFarmsByProducerIdRepository,
    IUpdateFarmRepository,
  ],
})
export class FarmRepositoryModule {}
