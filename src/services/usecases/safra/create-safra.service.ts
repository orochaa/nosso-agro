import { Safra } from '#domain/entities/safra.js'
import { ICreateSafra } from '#domain/usecases/safra/create-safra.js'
import { IFindFarmByIdRepository } from '#services/protocols/database/farm-repository.js'
import { ICreateSafraRepository } from '#services/protocols/database/safra-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class CreateSafra implements ICreateSafra {
  constructor(
    readonly findFarmByIdRepository: IFindFarmByIdRepository,
    readonly createSafraRepository: ICreateSafraRepository
  ) {}

  async create(params: ICreateSafra.Params): Promise<Safra> {
    const farm = await this.findFarmByIdRepository.findById(params.farmId)

    if (!farm) {
      throw new BadRequestException('Fazenda não encontrada')
    }

    const safra = Safra.create({
      farmId: farm.id,
      name: params.name,
    })
    await this.createSafraRepository.create(safra)

    return safra
  }
}
