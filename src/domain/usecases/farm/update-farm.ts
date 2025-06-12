import type { Farm } from '#domain/entities/farm.js'

export abstract class IUpdateFarm {
  abstract update(params: IUpdateFarm.Params): Promise<Farm>
}

export namespace IUpdateFarm {
  export interface Params {
    farmId: string
    name: string
    city: string
    state: string
    totalArea: number
    arableArea: number
    vegetationArea: number
  }
}
