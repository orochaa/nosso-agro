import {
  ICreateProducerRepository,
  IDeleteProducerRepository,
  IFindProducerByEmailRepository,
  IFindProducerByIdRepository,
  IListProducersRepository,
  IUpdateProducerRepository,
} from '#services/protocols/database/producer-repository.js'
import { ProducerRepository } from '#infra/database/postgres/producer-repository.service.js'
import { PrismaGatewayModule } from '#main/modules/gateways/prisma-gateway.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaGatewayModule],
  providers: [
    ProducerRepository,
    {
      provide: ICreateProducerRepository,
      useExisting: ProducerRepository,
    },
    {
      provide: IDeleteProducerRepository,
      useExisting: ProducerRepository,
    },
    {
      provide: IFindProducerByEmailRepository,
      useExisting: ProducerRepository,
    },
    {
      provide: IFindProducerByIdRepository,
      useExisting: ProducerRepository,
    },
    {
      provide: IListProducersRepository,
      useExisting: ProducerRepository,
    },
    {
      provide: IUpdateProducerRepository,
      useExisting: ProducerRepository,
    },
  ],
  exports: [
    ICreateProducerRepository,
    IDeleteProducerRepository,
    IFindProducerByEmailRepository,
    IFindProducerByIdRepository,
    IListProducersRepository,
    IUpdateProducerRepository,
  ],
})
export class ProducerRepositoryModule {}
