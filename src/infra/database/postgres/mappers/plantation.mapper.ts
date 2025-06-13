import { Plantation } from '#domain/entities/plantation.js'
import type { Plantation as PrismaPlantation } from '@prisma/client'

export const PlantationMapper = {
  toPrisma(data: Plantation): PrismaPlantation {
    return {
      id: data.id,
      name: data.name,
      safraId: data.safraId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: null,
    }
  },
  toDomain(data: PrismaPlantation): Plantation {
    return new Plantation(data)
  },
  mapToDomain(data: PrismaPlantation[]): Plantation[] {
    return data.map(d => PlantationMapper.toDomain(d))
  },
}
