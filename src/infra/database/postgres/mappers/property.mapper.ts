import { Property } from '#domain/entities/property.js'
import type { Property as PrismaProperty } from '@prisma/client'

export const PropertyMapper = {
  toPrisma(data: Property): PrismaProperty {
    return {
      id: data.id,
      name: data.name,
      producerId: data.producerId,
      city: data.city,
      state: data.state,
      totalArea: data.totalArea,
      agriculturalArea: data.agriculturalArea,
      vegetationArea: data.vegetationArea,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: null,
    }
  },
  toDomain(data: PrismaProperty): Property {
    return new Property(data)
  },
  mapToDomain(data: PrismaProperty[]): Property[] {
    return data.map(d => PropertyMapper.toDomain(d))
  },
}
