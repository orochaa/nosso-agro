import type { Safra } from '#domain/entities/safra.js'

export abstract class IUpdateSafra {
  abstract update(params: IUpdateSafra.Params): Promise<Safra>
}

export namespace IUpdateSafra {
  export interface Params {
    safraId: string
    name: string
  }
}
