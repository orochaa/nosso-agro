import { ICreateProducer } from '#domain/usecases/producer/create-producer.js'
import { IDeleteProducer } from '#domain/usecases/producer/delete-producer.js'
import { IFindProducerById } from '#domain/usecases/producer/find-producer-by-id.js'
import { IListProducers } from '#domain/usecases/producer/list-producers.js'
import { IUpdateProducer } from '#domain/usecases/producer/update-producer.js'
import { CreateProducerController } from '#presentation/controllers/producer/create-producer.controller.js'
import { DeleteProducerController } from '#presentation/controllers/producer/delete-producer.controller.js'
import { FindProducerByIdController } from '#presentation/controllers/producer/find-producer-by-id.controller.js'
import { ListProducersController } from '#presentation/controllers/producer/list-producers.controller.js'
import { UpdateProducerController } from '#presentation/controllers/producer/update-producer.controller.js'
import { IHashGenerator } from '#services/protocols/data/hasher.js'
import {
  IDeleteProducerRepository,
  IListProducersRepository,
} from '#services/protocols/database/producer-repository.js'
import { CreateProducer } from '#services/usecases/producer/create-producer.service.js'
import { FindProducerById } from '#services/usecases/producer/find-producer-by-id.service.js'
import { UpdateProducer } from '#services/usecases/producer/update-producer.service.js'
import { HashAdapter } from '#infra/adapters/hash.adapter.js'
import { MailerGatewayModule } from '#main/modules/gateways/mailer-gateway.module.js'
import { ProducerRepositoryModule } from '#main/modules/repositories/producer-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [MailerGatewayModule, ProducerRepositoryModule],
  controllers: [
    CreateProducerController,
    UpdateProducerController,
    ListProducersController,
    FindProducerByIdController,
    DeleteProducerController,
  ],
  providers: [
    {
      provide: ICreateProducer,
      useClass: CreateProducer,
    },
    {
      provide: IUpdateProducer,
      useClass: UpdateProducer,
    },
    {
      provide: IFindProducerById,
      useClass: FindProducerById,
    },
    {
      provide: IDeleteProducer,
      useExisting: IDeleteProducerRepository,
    },
    {
      provide: IListProducers,
      useExisting: IListProducersRepository,
    },
    {
      provide: IHashGenerator,
      useClass: HashAdapter,
    },
  ],
})
export class ProducerControllerModule {}
