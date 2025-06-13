import type { Plantation } from '#domain/entities/plantation.js'
import type {
  ICreatePlantationRepository,
  IDeletePlantationRepository,
  IListPlantationsBySafraIdRepository,
  IUpdatePlantationRepository,
} from '#services/protocols/database/plantation-repository.js'
import { PlantationMapper } from '#infra/database/postgres/mappers/plantation.mapper.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'

interface IPlantationRepository
  extends ICreatePlantationRepository,
    IDeletePlantationRepository,
    IListPlantationsBySafraIdRepository,
    IUpdatePlantationRepository {}

@Injectable()
export class PlantationRepository implements IPlantationRepository {
  constructor(private readonly db: PrismaService) {}

  async create(data: Plantation): Promise<void> {
    await this.db.plantation.create({
      data: PlantationMapper.toPrisma(data),
    })
  }

  async list(): Promise<Plantation[]> {
    const data = await this.db.plantation.findMany({
      where: {
        deletedAt: null,
      },
    })

    return PlantationMapper.mapToDomain(data)
  }

  async listBySafraId(dataId: string): Promise<Plantation[]> {
    const data = await this.db.plantation.findMany({
      where: {
        safraId: dataId,
        deletedAt: null,
      },
    })

    return PlantationMapper.mapToDomain(data)
  }

  async findById(id: string): Promise<Plantation | null> {
    const data = await this.db.plantation.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    return data && PlantationMapper.toDomain(data)
  }

  async update(data: Plantation): Promise<void> {
    await this.db.plantation.update({
      data: PlantationMapper.toPrisma(data),
      where: {
        id: data.id,
        deletedAt: null,
      },
    })
  }

  async delete(plantation: Plantation): Promise<void> {
    await this.db.plantation.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: plantation.id,
        deletedAt: null,
      },
    })
  }
}
