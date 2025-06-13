import { Safra } from '#domain/entities/safra.js'
import { ICreateSafra } from '#domain/usecases/safra/create-safra.js'
import { IFindPropertyByIdRepository } from '#services/protocols/database/property-repository.js'
import { ICreateSafraRepository } from '#services/protocols/database/safra-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class CreateSafra implements ICreateSafra {
  constructor(
    readonly findPropertyByIdRepository: IFindPropertyByIdRepository,
    readonly createSafraRepository: ICreateSafraRepository
  ) {}

  async create(params: ICreateSafra.Params): Promise<Safra> {
    const property = await this.findPropertyByIdRepository.findById(
      params.propertyId
    )

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada')
    }

    const safra = Safra.create({
      propertyId: property.id,
      name: params.name,
    })
    await this.createSafraRepository.create(safra)

    return safra
  }
}
