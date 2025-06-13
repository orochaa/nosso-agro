import type { Plantation } from '#domain/entities/plantation.js'

export abstract class IListPlantationsBySafraId {
  abstract listBySafraId(safraId: string): Promise<Plantation[]>
}
