import type { Farm } from '#domain/entities/farm.js'
import type {
  ICreateFarmRepository,
  IDeleteFarmRepository,
  IFindFarmByIdRepository,
  IListFarmsByProducerIdRepository,
  IUpdateFarmRepository,
} from '#services/protocols/database/farm-repository.js'
import { FarmMapper } from '#infra/database/postgres/mappers/farm.mapper.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'

interface IFarmRepository
  extends ICreateFarmRepository,
    IDeleteFarmRepository,
    IFindFarmByIdRepository,
    IListFarmsByProducerIdRepository,
    IUpdateFarmRepository {}

@Injectable()
export class FarmRepository implements IFarmRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: Farm): Promise<void> {
    await this.db.farm.create({
      data: FarmMapper.toPrisma(data),
    })
  }

  async list(): Promise<Farm[]> {
    const data = await this.db.farm.findMany({
      where: {
        deletedAt: null,
      },
    })

    return FarmMapper.mapToDomain(data)
  }

  async listByProducerId(dataId: string): Promise<Farm[]> {
    const data = await this.db.farm.findMany({
      where: {
        producerId: dataId,
        deletedAt: null,
      },
    })

    return FarmMapper.mapToDomain(data)
  }

  async findById(id: string): Promise<Farm | null> {
    const data = await this.db.farm.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    return data && FarmMapper.toDomain(data)
  }

  async update(data: Farm): Promise<void> {
    await this.db.farm.update({
      data: FarmMapper.toPrisma(data),
      where: {
        id: data.id,
        deletedAt: null,
      },
    })
  }

  async delete(farm: Farm): Promise<void> {
    await this.db.farm.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: farm.id,
        deletedAt: null,
      },
    })
  }
}
