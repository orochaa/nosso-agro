import type { Producer } from '#domain/entities/producer.js'

export abstract class IFindProducerById {
  abstract findById(producerId: string): Promise<Producer>
}
