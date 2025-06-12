import type { Producer } from '#domain/entities/producer.js'

export abstract class ICreateProducer {
  abstract create(params: ICreateProducer.Params): Promise<Producer>
}

export namespace ICreateProducer {
  export interface Params {
    firstName: string
    lastName: string
    email: string
    document: string
  }
}
