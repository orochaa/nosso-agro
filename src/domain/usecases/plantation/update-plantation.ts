import type { Plantation } from '#domain/entities/plantation.js'

export abstract class IUpdatePlantation {
  abstract update(params: IUpdatePlantation.Params): Promise<Plantation>
}

export namespace IUpdatePlantation {
  export interface Params {
    plantationId: string
    name: string
  }
}
