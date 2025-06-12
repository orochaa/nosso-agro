import type { Producer } from '#domain/entities/producer.js'

export abstract class IUpdateProducer {
  abstract update(params: IUpdateProducer.Params): Promise<Producer>
}

export namespace IUpdateProducer {
  export interface Params {
    producerId: string
    firstName: string
    lastName: string
    email: string
    document: string
  }
}
