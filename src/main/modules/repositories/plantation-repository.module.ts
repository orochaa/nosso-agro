import {
  ICreatePlantationRepository,
  IDeletePlantationRepository,
  IFindPlantationByIdRepository,
  IListPlantationsBySafraIdRepository,
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
      provide: IListPlantationsBySafraIdRepository,
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
    IListPlantationsBySafraIdRepository,
    IUpdatePlantationRepository,
    IFindPlantationByIdRepository,
  ],
})
export class PlantationRepositoryModule {}
