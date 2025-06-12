import type { Producer } from '#domain/entities/producer.js'
import type {
  ICreateProducerRepository,
  IDeleteProducerRepository,
  IFindProducerByEmailRepository,
  IFindProducerByIdRepository,
  IListProducersRepository,
  IUpdateProducerRepository,
} from '#services/protocols/database/producer-repository.js'
import { ProducerMapper } from '#infra/database/postgres/mappers/producer.mapper.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'

interface IProducerRepository
  extends ICreateProducerRepository,
    IDeleteProducerRepository,
    IFindProducerByEmailRepository,
    IFindProducerByIdRepository,
    IListProducersRepository,
    IUpdateProducerRepository {}

@Injectable()
export class ProducerRepository implements IProducerRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: Producer): Promise<void> {
    await this.db.producer.create({
      data: ProducerMapper.toPrisma(data),
    })
  }

  async list(): Promise<Producer[]> {
    const data = await this.db.producer.findMany({
      where: {
        deletedAt: null,
      },
    })

    return ProducerMapper.mapToDomain(data)
  }

  async findById(id: string): Promise<Producer | null> {
    const data = await this.db.producer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    return data && ProducerMapper.toDomain(data)
  }

  async findByEmail(producerEmail: string): Promise<Producer | null> {
    const data = await this.db.producer.findFirst({
      where: {
        email: producerEmail,
        deletedAt: null,
      },
    })

    return data && ProducerMapper.toDomain(data)
  }

  async update(data: Producer): Promise<void> {
    await this.db.producer.update({
      data: ProducerMapper.toPrisma(data),
      where: {
        id: data.id,
        deletedAt: null,
      },
    })
  }

  async delete(producer: Producer): Promise<void> {
    await this.db.producer.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: producer.id,
        deletedAt: null,
      },
    })
  }
}
