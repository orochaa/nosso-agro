import { Safra } from '#domain/entities/safra.js'
import type { Safra as PrismaSafra } from '@prisma/client'

export const SafraMapper = {
  toPrisma(data: Safra): PrismaSafra {
    return {
      id: data.id,
      propertyId: data.propertyId,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: null,
    }
  },
  toDomain(data: PrismaSafra): Safra {
    return new Safra(data)
  },
  mapToDomain(data: PrismaSafra[]): Safra[] {
    return data.map(d => SafraMapper.toDomain(d))
  },
}
