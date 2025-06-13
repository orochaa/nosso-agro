import type { IDeleteFarm } from '#domain/usecases/farm/delete-farm.js'
import {
  IDeleteFarmRepository,
  IFindFarmByIdRepository,
} from '#services/protocols/database/farm-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteFarm implements IDeleteFarm {
  constructor(
    readonly findFarmByIdRepository: IFindFarmByIdRepository,
    readonly deleteFarmRepository: IDeleteFarmRepository
  ) {}

  async delete(farmId: string): Promise<void> {
    const farm = await this.findFarmByIdRepository.findById(farmId)

    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada')
    }

    await this.deleteFarmRepository.delete(farm)
  }
}
