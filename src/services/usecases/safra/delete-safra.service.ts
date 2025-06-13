import type { IDeleteSafra } from '#domain/usecases/safra/delete-safra.js'
import {
  IDeleteSafraRepository,
  IFindSafraByIdRepository,
} from '#services/protocols/database/safra-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteSafra implements IDeleteSafra {
  constructor(
    readonly findSafraByIdRepository: IFindSafraByIdRepository,
    readonly deleteSafraRepository: IDeleteSafraRepository
  ) {}

  async delete(propertyId: string): Promise<void> {
    const safra = await this.findSafraByIdRepository.findById(propertyId)

    if (!safra) {
      throw new NotFoundException('Safra não encontrada')
    }

    await this.deleteSafraRepository.delete(safra)
  }
}
