import type { Safra } from '#domain/entities/safra.js'

export abstract class IListSafrasByPropertyId {
  abstract listByPropertyId(propertyId: string): Promise<Safra[]>
}
