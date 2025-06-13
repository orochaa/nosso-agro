import type { IDeletePlantation } from '#domain/usecases/plantation/delete-plantation.js'
import {
  IDeletePlantationRepository,
  IFindPlantationByIdRepository,
} from '#services/protocols/database/plantation-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeletePlantation implements IDeletePlantation {
  constructor(
    readonly findPlantationByIdRepository: IFindPlantationByIdRepository,
    readonly deletePlantationRepository: IDeletePlantationRepository
  ) {}

  async delete(propertyId: string): Promise<void> {
    const plantation =
      await this.findPlantationByIdRepository.findById(propertyId)

    if (!plantation) {
      throw new NotFoundException('Plantação não encontrada')
    }

    await this.deletePlantationRepository.delete(plantation)
  }
}
