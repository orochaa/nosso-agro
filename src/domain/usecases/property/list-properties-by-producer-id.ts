import type { Property } from '#domain/entities/property.js'

export abstract class IListPropertiesByProducerId {
  abstract listByProducerId(producerId: string): Promise<Property[]>
}
