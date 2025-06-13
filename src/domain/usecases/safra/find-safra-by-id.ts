import type { Safra } from '#domain/entities/safra.js'

export abstract class IFindSafraById {
  abstract findById(safraId: string): Promise<Safra>
}
