import { Property } from '#domain/entities/property.js'
import { ICreateProperty } from '#domain/usecases/property/create-property.js'
import { IFindProducerByIdRepository } from '#services/protocols/database/producer-repository.js'
import { ICreatePropertyRepository } from '#services/protocols/database/property-repository.js'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class CreateProperty implements ICreateProperty {
  constructor(
    readonly findProducerByIdRepository: IFindProducerByIdRepository,
    readonly createPropertyRepository: ICreatePropertyRepository
  ) {}

  async create(params: ICreateProperty.Params): Promise<Property> {
    const producer = await this.findProducerByIdRepository.findById(
      params.producerId
    )

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado')
    }

    if (params.totalArea < params.agriculturalArea + params.vegetationArea) {
      throw new BadRequestException(
        'A área total não pode ser menor que a soma da área arável e da área de vegetação'
      )
    }

    const property = Property.create({
      producerId: producer.id,
      name: params.name,
      city: params.city,
      state: params.state,
      agriculturalArea: params.agriculturalArea,
      totalArea: params.totalArea,
      vegetationArea: params.vegetationArea,
    })
    await this.createPropertyRepository.create(property)

    return property
  }
}
