import {
  ICreatePlantationRepository,
  IDeletePlantationRepository,
  IFindPlantationByIdRepository,
  IListPlantationsBySafraId,
  IUpdatePlantationRepository,
} from '#services/protocols/database/plantation-repository.js'
import { PlantationRepository } from '#infra/database/postgres/plantation-repository.service.js'
import { PrismaGatewayModule } from '#main/modules/gateways/prisma-gateway.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaGatewayModule],
  providers: [
    PlantationRepository,
    {
      provide: ICreatePlantationRepository,
      useExisting: PlantationRepository,
    },
    {
      provide: IDeletePlantationRepository,
      useExisting: PlantationRepository,
    },
    {
      provide: IListPlantationsBySafraId,
      useExisting: PlantationRepository,
    },
    {
      provide: IUpdatePlantationRepository,
      useExisting: PlantationRepository,
    },
    {
      provide: IFindPlantationByIdRepository,
      useExisting: PlantationRepository,
    },
  ],
  exports: [
    ICreatePlantationRepository,
    IDeletePlantationRepository,
    IListPlantationsBySafraId,
    IUpdatePlantationRepository,
    IFindPlantationByIdRepository,
  ],
})
export class PlantationRepositoryModule {}
