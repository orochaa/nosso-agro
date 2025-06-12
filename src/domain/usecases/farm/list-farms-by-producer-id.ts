import type { Farm } from '#domain/entities/farm.js'

export abstract class IListFarmsByProducerId {
  abstract listByProducerId(producerId: string): Promise<Farm[]>
}
