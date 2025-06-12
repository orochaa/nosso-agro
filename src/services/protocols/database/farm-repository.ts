import type { Farm } from '#domain/entities/farm.js'

export abstract class ICreateFarmRepository {
  abstract create(data: Farm): Promise<void>
}

export abstract class IUpdateFarmRepository {
  abstract update(data: Farm): Promise<void>
}

export abstract class IFindFarmByIdRepository {
  abstract findById(dataId: string): Promise<Farm | null>
}

export abstract class IDeleteFarmRepository {
  abstract delete(data: Farm): Promise<void>
}

export abstract class IListFarmsByProducerIdRepository {
  abstract listByProducerId(dataId: string): Promise<Farm[]>
}
