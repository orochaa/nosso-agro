import { Safra } from '#domain/entities/safra.js'
import { IUpdateSafra } from '#domain/usecases/safra/update-safra.js'
import { IUpdateSafraRepository } from '#services/protocols/database/safra-repository.js'
import { IFindSafraByIdRepository } from '#services/protocols/database/safra-repository.js'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UpdateSafra implements IUpdateSafra {
  constructor(
    readonly findSafraByIdRepository: IFindSafraByIdRepository,
    readonly updateSafraRepository: IUpdateSafraRepository
  ) {}

  async update(params: IUpdateSafra.Params): Promise<Safra> {
    const safra = await this.findSafraByIdRepository.findById(params.safraId)

    if (!safra) {
      throw new NotFoundException('Safra não encontrada')
    }

    safra.name = params.name
    await this.updateSafraRepository.update(safra)

    return safra
  }
}
