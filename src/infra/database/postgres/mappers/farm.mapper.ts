import { Farm } from '#domain/entities/farm.js'
import type { Farm as PrismaFarm } from '@prisma/client'

export const FarmMapper = {
  toPrisma(data: Farm): PrismaFarm {
    return {
      id: data.id,
      name: data.name,
      producerId: data.producerId,
      city: data.city,
      state: data.state,
      totalArea: data.totalArea,
      arableArea: data.arableArea,
      vegetationArea: data.vegetationArea,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: null,
    }
  },
  toDomain(data: PrismaFarm): Farm {
    return new Farm(data)
  },
  mapToDomain(data: PrismaFarm[]): Farm[] {
    return data.map(d => FarmMapper.toDomain(d))
  },
}
