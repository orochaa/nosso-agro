import { Property } from '#domain/entities/property.js'
import { IUpdateProperty } from '#domain/usecases/property/update-property.js'
import { IUpdatePropertyRepository } from '#services/protocols/database/property-repository.js'
import { IFindPropertyByIdRepository } from '#services/protocols/database/property-repository.js'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class UpdateProperty implements IUpdateProperty {
  constructor(
    readonly findPropertyByIdRepository: IFindPropertyByIdRepository,
    readonly updatePropertyRepository: IUpdatePropertyRepository
  ) {}

  async update(params: IUpdateProperty.Params): Promise<Property> {
    const property = await this.findPropertyByIdRepository.findById(
      params.propertyId
    )

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada')
    }

    if (params.totalArea < params.agriculturalArea + params.vegetationArea) {
      throw new BadRequestException(
        'A área total não pode ser menor que a soma da área arável e da área de vegetação'
      )
    }

    property.name = params.name
    property.city = params.city
    property.state = params.state
    property.totalArea = params.totalArea
    property.agriculturalArea = params.agriculturalArea
    property.vegetationArea = params.vegetationArea
    await this.updatePropertyRepository.update(property)

    return property
  }
}
