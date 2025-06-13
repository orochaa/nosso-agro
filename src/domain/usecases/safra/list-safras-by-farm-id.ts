import type { Safra } from '#domain/entities/safra.js'

export abstract class IListSafrasByFarmId {
  abstract listByFarmId(farmId: string): Promise<Safra[]>
}
