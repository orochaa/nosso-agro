import { Producer } from '#domain/entities/producer.js'
import { IUpdateProducer } from '#domain/usecases/producer/update-producer.js'
import {
  IFindProducerByEmailRepository,
  IFindProducerByIdRepository,
  IUpdateProducerRepository,
} from '#services/protocols/database/producer-repository.js'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class UpdateProducer implements IUpdateProducer {
  constructor(
    readonly findProducerByIdRepository: IFindProducerByIdRepository,
    readonly findProducerByEmailRepository: IFindProducerByEmailRepository,
    readonly updateProducerRepository: IUpdateProducerRepository
  ) {}

  async update(params: IUpdateProducer.Params): Promise<Producer> {
    const producer = await this.findProducerByIdRepository.findById(
      params.producerId
    )

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado')
    }

    if (params.email !== producer.email) {
      const isDuplicated = await this.findProducerByEmailRepository.findByEmail(
        params.email
      )

      if (isDuplicated) {
        throw new BadRequestException('Email já cadastrado')
      }
    }

    producer.firstName = params.firstName
    producer.lastName = params.lastName
    producer.email = params.email
    producer.document = params.document
    await this.updateProducerRepository.update(producer)

    return producer
  }
}
