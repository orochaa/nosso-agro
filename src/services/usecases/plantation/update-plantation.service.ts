import { Plantation } from '#domain/entities/plantation.js'
import { IUpdatePlantation } from '#domain/usecases/plantation/update-plantation.js'
import { IUpdatePlantationRepository } from '#services/protocols/database/plantation-repository.js'
import { IFindPlantationByIdRepository } from '#services/protocols/database/plantation-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class UpdatePlantation implements IUpdatePlantation {
  constructor(
    readonly findPlantationByIdRepository: IFindPlantationByIdRepository,
    readonly updatePlantationRepository: IUpdatePlantationRepository
  ) {}

  async update(params: IUpdatePlantation.Params): Promise<Plantation> {
    const plantation = await this.findPlantationByIdRepository.findById(
      params.plantationId
    )

    if (!plantation) {
      throw new BadRequestException('Plantação não encontrada')
    }

    plantation.name = params.name
    await this.updatePlantationRepository.update(plantation)

    return plantation
  }
}
