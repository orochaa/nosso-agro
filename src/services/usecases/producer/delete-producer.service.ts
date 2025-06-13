import type { IDeleteProducer } from '#domain/usecases/producer/delete-producer.js'
import {
  IDeleteProducerRepository,
  IFindProducerByIdRepository,
} from '#services/protocols/database/producer-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteProducer implements IDeleteProducer {
  constructor(
    readonly findProducerByIdRepository: IFindProducerByIdRepository,
    readonly deleteProducerRepository: IDeleteProducerRepository
  ) {}

  async delete(farmId: string): Promise<void> {
    const producer = await this.findProducerByIdRepository.findById(farmId)

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado')
    }

    await this.deleteProducerRepository.delete(producer)
  }
}
