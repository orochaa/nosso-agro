import type { Property } from '#domain/entities/property.js'
import type { IFindPropertyById } from '#domain/usecases/property/find-property-by-id.js'
import { IFindPropertyByIdRepository } from '#services/protocols/database/property-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindPropertyById implements IFindPropertyById {
  constructor(
    readonly findPropertyByIdRepository: IFindPropertyByIdRepository
  ) {}

  async findById(propertyId: string): Promise<Property> {
    const property = await this.findPropertyByIdRepository.findById(propertyId)

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada')
    }

    return property
  }
}
