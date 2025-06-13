import type { Property } from '#domain/entities/property.js'

export abstract class ICreateProperty {
  abstract create(params: ICreateProperty.Params): Promise<Property>
}

export namespace ICreateProperty {
  export interface Params {
    producerId: string
    name: string
    city: string
    state: string
    totalArea: number
    arableArea: number
    vegetationArea: number
  }
}
