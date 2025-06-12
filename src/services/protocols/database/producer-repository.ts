import type { Producer } from '#domain/entities/producer.js'

export abstract class ICreateProducerRepository {
  abstract create(data: Producer): Promise<void>
}

export abstract class IUpdateProducerRepository {
  abstract update(data: Producer): Promise<void>
}

export abstract class IFindProducerByIdRepository {
  abstract findById(producerId: string): Promise<Producer | null>
}

export abstract class IFindProducerByEmailRepository {
  abstract findByEmail(producerEmail: string): Promise<Producer | null>
}

export abstract class IListProducersRepository {
  abstract list(): Promise<Producer[]>
}

export abstract class IDeleteProducerRepository {
  abstract delete(data: Producer): Promise<void>
}
