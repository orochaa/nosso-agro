import { Plantation } from '#domain/entities/plantation.js'
import { ICreatePlantation } from '#domain/usecases/plantation/create-plantation.js'
import { ICreatePlantationRepository } from '#services/protocols/database/plantation-repository.js'
import { IFindSafraByIdRepository } from '#services/protocols/database/safra-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class CreatePlantation implements ICreatePlantation {
  constructor(
    readonly findSafraByIdRepository: IFindSafraByIdRepository,
    readonly createPlantationRepository: ICreatePlantationRepository
  ) {}

  async create(params: ICreatePlantation.Params): Promise<Plantation> {
    const safra = await this.findSafraByIdRepository.findById(params.safraId)

    if (!safra) {
      throw new NotFoundException('Safra não encontrado')
    }

    const plantation = Plantation.create({
      safraId: safra.id,
      name: params.name,
    })
    await this.createPlantationRepository.create(plantation)

    return plantation
  }
}
