import type { Plantation } from '#domain/entities/plantation.js'

export abstract class ICreatePlantation {
  abstract create(params: ICreatePlantation.Params): Promise<Plantation>
}

export namespace ICreatePlantation {
  export interface Params {
    safraId: string
    name: string
  }
}
