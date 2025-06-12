import type { Producer } from '#domain/entities/producer.js'

export abstract class IListProducers {
  abstract list(): Promise<Producer[]>
}
