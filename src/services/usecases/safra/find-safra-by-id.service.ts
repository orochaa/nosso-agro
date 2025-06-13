import type { Safra } from '#domain/entities/safra.js'
import type { IFindSafraById } from '#domain/usecases/safra/find-safra-by-id.js'
import { IFindSafraByIdRepository } from '#services/protocols/database/safra-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindSafraById implements IFindSafraById {
  constructor(readonly findSafraByIdRepository: IFindSafraByIdRepository) {}

  async findById(farmId: string): Promise<Safra> {
    const safra = await this.findSafraByIdRepository.findById(farmId)

    if (!safra) {
      throw new NotFoundException('Safra não encontrada')
    }

    return safra
  }
}
