import type { Property } from '#domain/entities/property.js'

export abstract class IFindPropertyById {
  abstract findById(propertyId: string): Promise<Property>
}
