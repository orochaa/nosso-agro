import {
  ICreatePropertyRepository,
  IDeletePropertyRepository,
  IFindPropertyByIdRepository,
  IListPropertiesByProducerIdRepository,
  IUpdatePropertyRepository,
} from '#services/protocols/database/property-repository.js'
import { PropertyRepository } from '#infra/database/postgres/property-repository.service.js'
import { PrismaGatewayModule } from '#main/modules/gateways/prisma-gateway.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaGatewayModule],
  providers: [
    PropertyRepository,
    {
      provide: ICreatePropertyRepository,
      useExisting: PropertyRepository,
    },
    {
      provide: IDeletePropertyRepository,
      useExisting: PropertyRepository,
    },
    {
      provide: IFindPropertyByIdRepository,
      useExisting: PropertyRepository,
    },
    {
      provide: IListPropertiesByProducerIdRepository,
      useExisting: PropertyRepository,
    },
    {
      provide: IUpdatePropertyRepository,
      useExisting: PropertyRepository,
    },
  ],
  exports: [
    ICreatePropertyRepository,
    IDeletePropertyRepository,
    IFindPropertyByIdRepository,
    IListPropertiesByProducerIdRepository,
    IUpdatePropertyRepository,
  ],
})
export class PropertyRepositoryModule {}
