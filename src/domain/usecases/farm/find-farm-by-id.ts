import type { Farm } from '#domain/entities/farm.js'

export abstract class IFindFarmById {
  abstract findById(farmId: string): Promise<Farm>
}
