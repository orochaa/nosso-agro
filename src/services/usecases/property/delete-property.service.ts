import type { IDeleteProperty } from '#domain/usecases/property/delete-property.js'
import {
  IDeletePropertyRepository,
  IFindPropertyByIdRepository,
} from '#services/protocols/database/property-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteProperty implements IDeleteProperty {
  constructor(
    readonly findPropertyByIdRepository: IFindPropertyByIdRepository,
    readonly deletePropertyRepository: IDeletePropertyRepository
  ) {}

  async delete(propertyId: string): Promise<void> {
    const property = await this.findPropertyByIdRepository.findById(propertyId)

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada')
    }

    await this.deletePropertyRepository.delete(property)
  }
}
