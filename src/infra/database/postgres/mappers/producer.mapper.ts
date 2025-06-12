import { Producer } from '#domain/entities/producer.js'
import type { Producer as PrismaProducer } from '@prisma/client'

export const ProducerMapper = {
  toPrisma(data: Producer): PrismaProducer {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      document: data.document,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: null,
    }
  },
  toDomain(data: PrismaProducer): Producer {
    return new Producer(data)
  },
  mapToDomain(data: PrismaProducer[]): Producer[] {
    return data.map(d => ProducerMapper.toDomain(d))
  },
}
