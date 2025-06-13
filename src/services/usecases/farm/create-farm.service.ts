import { Farm } from '#domain/entities/farm.js'
import { ICreateFarm } from '#domain/usecases/farm/create-farm.js'
import { ICreateFarmRepository } from '#services/protocols/database/farm-repository.js'
import { IFindProducerByIdRepository } from '#services/protocols/database/producer-repository.js'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class CreateFarm implements ICreateFarm {
  constructor(
    readonly findProducerByIdRepository: IFindProducerByIdRepository,
    readonly createFarmRepository: ICreateFarmRepository
  ) {}

  async create(params: ICreateFarm.Params): Promise<Farm> {
    const producer = await this.findProducerByIdRepository.findById(
      params.producerId
    )

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado')
    }

    if (params.totalArea < params.arableArea + params.vegetationArea) {
      throw new BadRequestException(
        'A área total não pode ser menor que a soma da área arável e da área de vegetação'
      )
    }

    const farm = Farm.create({
      producerId: producer.id,
      name: params.name,
      city: params.city,
      state: params.state,
      arableArea: params.arableArea,
      totalArea: params.totalArea,
      vegetationArea: params.vegetationArea,
    })
    await this.createFarmRepository.create(farm)

    return farm
  }
}
