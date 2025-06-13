import type { Safra } from '#domain/entities/safra.js'

export abstract class ICreateSafraRepository {
  abstract create(data: Safra): Promise<void>
}

export abstract class IUpdateSafraRepository {
  abstract update(data: Safra): Promise<void>
}

export abstract class IFindSafraByIdRepository {
  abstract findById(dataId: string): Promise<Safra | null>
}

export abstract class IDeleteSafraRepository {
  abstract delete(data: Safra): Promise<void>
}

export abstract class IListSafrasByPropertyIdRepository {
  abstract listByPropertyId(dataId: string): Promise<Safra[]>
}
