import type { Property } from '#domain/entities/property.js'
import type {
  ICreatePropertyRepository,
  IDeletePropertyRepository,
  IFindPropertyByIdRepository,
  IListPropertiesByProducerIdRepository,
  IUpdatePropertyRepository,
} from '#services/protocols/database/property-repository.js'
import { PropertyMapper } from '#infra/database/postgres/mappers/property.mapper.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'

interface IPropertyRepository
  extends ICreatePropertyRepository,
    IDeletePropertyRepository,
    IFindPropertyByIdRepository,
    IListPropertiesByProducerIdRepository,
    IUpdatePropertyRepository {}

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: Property): Promise<void> {
    await this.db.property.create({
      data: PropertyMapper.toPrisma(data),
    })
  }

  async list(): Promise<Property[]> {
    const data = await this.db.property.findMany({
      where: {
        deletedAt: null,
      },
    })

    return PropertyMapper.mapToDomain(data)
  }

  async listByProducerId(dataId: string): Promise<Property[]> {
    const data = await this.db.property.findMany({
      where: {
        producerId: dataId,
        deletedAt: null,
      },
    })

    return PropertyMapper.mapToDomain(data)
  }

  async findById(id: string): Promise<Property | null> {
    const data = await this.db.property.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    return data && PropertyMapper.toDomain(data)
  }

  async update(data: Property): Promise<void> {
    await this.db.property.update({
      data: PropertyMapper.toPrisma(data),
      where: {
        id: data.id,
        deletedAt: null,
      },
    })
  }

  async delete(property: Property): Promise<void> {
    await this.db.property.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: property.id,
        deletedAt: null,
      },
    })
  }
}
