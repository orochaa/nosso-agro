import type { Plantation } from '#domain/entities/plantation.js'

export abstract class ICreatePlantationRepository {
  abstract create(data: Plantation): Promise<void>
}

export abstract class IUpdatePlantationRepository {
  abstract update(data: Plantation): Promise<void>
}

export abstract class IFindPlantationByIdRepository {
  abstract findById(dataId: string): Promise<Plantation | null>
}

export abstract class IDeletePlantationRepository {
  abstract delete(data: Plantation): Promise<void>
}

export abstract class IListPlantationsBySafraId {
  abstract listBySafraId(dataId: string): Promise<Plantation[]>
}
