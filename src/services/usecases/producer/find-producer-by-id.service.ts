import type { Producer } from '#domain/entities/producer.js'
import type { IFindProducerById } from '#domain/usecases/producer/find-producer-by-id.js'
import { IFindProducerByIdRepository } from '#services/protocols/database/producer-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindProducerById implements IFindProducerById {
  constructor(
    readonly findProducerByIdRepository: IFindProducerByIdRepository
  ) {}

  async findById(producerId: string): Promise<Producer> {
    const producer = await this.findProducerByIdRepository.findById(producerId)

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado')
    }

    return producer
  }
}
