import type { Property } from '#domain/entities/property.js'

export abstract class IUpdateProperty {
  abstract update(params: IUpdateProperty.Params): Promise<Property>
}

export namespace IUpdateProperty {
  export interface Params {
    propertyId: string
    name: string
    city: string
    state: string
    totalArea: number
    agriculturalArea: number
    vegetationArea: number
  }
}
