import type { Farm } from '#domain/entities/farm.js'
import type { IFindFarmById } from '#domain/usecases/farm/find-farm-by-id.js'
import { IFindFarmByIdRepository } from '#services/protocols/database/farm-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindFarmById implements IFindFarmById {
  constructor(readonly findFarmByIdRepository: IFindFarmByIdRepository) {}

  async findById(farmId: string): Promise<Farm> {
    const farm = await this.findFarmByIdRepository.findById(farmId)

    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada')
    }

    return farm
  }
}
