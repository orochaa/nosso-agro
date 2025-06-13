import type { Property } from '#domain/entities/property.js'

export abstract class ICreatePropertyRepository {
  abstract create(data: Property): Promise<void>
}

export abstract class IUpdatePropertyRepository {
  abstract update(data: Property): Promise<void>
}

export abstract class IFindPropertyByIdRepository {
  abstract findById(dataId: string): Promise<Property | null>
}

export abstract class IDeletePropertyRepository {
  abstract delete(data: Property): Promise<void>
}

export abstract class IListPropertiesByProducerIdRepository {
  abstract listByProducerId(dataId: string): Promise<Property[]>
}
