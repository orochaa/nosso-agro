import { Farm } from '#domain/entities/farm.js'
import { IUpdateFarm } from '#domain/usecases/farm/update-farm.js'
import { IUpdateFarmRepository } from '#services/protocols/database/farm-repository.js'
import { IFindFarmByIdRepository } from '#services/protocols/database/farm-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateFarm implements IUpdateFarm {
  constructor(
    readonly findFarmByIdRepository: IFindFarmByIdRepository,
    readonly updateFarmRepository: IUpdateFarmRepository
  ) {}

  async update(params: IUpdateFarm.Params): Promise<Farm> {
    const farm = await this.findFarmByIdRepository.findById(params.farmId)

    if (!farm) {
      throw new BadRequestException('Fazenda não encontrada')
    }

    if (params.totalArea < params.arableArea + params.vegetationArea) {
      throw new BadRequestException(
        'A área total não pode ser menor que a soma da área arável e da área de vegetação'
      )
    }

    farm.name = params.name
    farm.city = params.city
    farm.state = params.state
    farm.totalArea = params.totalArea
    farm.arableArea = params.arableArea
    farm.vegetationArea = params.vegetationArea
    await this.updateFarmRepository.update(farm)

    return farm
  }
}
