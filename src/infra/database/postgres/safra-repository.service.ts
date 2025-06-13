import type { Safra } from '#domain/entities/safra.js'
import type {
  ICreateSafraRepository,
  IDeleteSafraRepository,
  IFindSafraByIdRepository,
  IListSafrasByFarmIdRepository,
  IUpdateSafraRepository,
} from '#services/protocols/database/safra-repository.js'
import { SafraMapper } from '#infra/database/postgres/mappers/safra.mapper.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'

interface ISafraRepository
  extends ICreateSafraRepository,
    IDeleteSafraRepository,
    IFindSafraByIdRepository,
    IListSafrasByFarmIdRepository,
    IUpdateSafraRepository {}

@Injectable()
export class SafraRepository implements ISafraRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: Safra): Promise<void> {
    await this.db.safra.create({
      data: SafraMapper.toPrisma(data),
    })
  }

  async list(): Promise<Safra[]> {
    const data = await this.db.safra.findMany({
      where: {
        deletedAt: null,
      },
    })

    return SafraMapper.mapToDomain(data)
  }

  async listByFarmId(dataId: string): Promise<Safra[]> {
    const data = await this.db.safra.findMany({
      where: {
        farmId: dataId,
        deletedAt: null,
      },
    })

    return SafraMapper.mapToDomain(data)
  }

  async findById(id: string): Promise<Safra | null> {
    const data = await this.db.safra.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    return data && SafraMapper.toDomain(data)
  }

  async update(data: Safra): Promise<void> {
    await this.db.safra.update({
      data: SafraMapper.toPrisma(data),
      where: {
        id: data.id,
        deletedAt: null,
      },
    })
  }

  async delete(safra: Safra): Promise<void> {
    await this.db.safra.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: safra.id,
        deletedAt: null,
      },
    })
  }
}
