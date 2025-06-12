import type { Farm } from '#domain/entities/farm.js'

export abstract class ICreateFarm {
  abstract create(params: ICreateFarm.Params): Promise<Farm>
}

export namespace ICreateFarm {
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
