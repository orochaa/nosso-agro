import type { Safra } from '#domain/entities/safra.js'

export abstract class ICreateSafra {
  abstract create(params: ICreateSafra.Params): Promise<Safra>
}

export namespace ICreateSafra {
  export interface Params {
    propertyId: string
    name: string
  }
}
