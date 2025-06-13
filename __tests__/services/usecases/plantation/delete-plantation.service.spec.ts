import {
  IDeletePlantationRepository,
  IFindPlantationByIdRepository,
} from '#services/protocols/database/plantation-repository.js'
import { DeletePlantation } from '#services/usecases/plantation/delete-plantation.service.js'
import { mockPlantation } from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

describe('DeletePlantation', () => {
  let updatePlantation: DeletePlantation
  let findPlantationByIdRepository: jest.Mocked<IFindPlantationByIdRepository>
  let deletePlantationRepository: jest.Mocked<IDeletePlantationRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeletePlantation,
        {
          provide: IFindPlantationByIdRepository,
          useValue: {
            findById: jest.fn(() => mockPlantation()),
          },
        },
        {
          provide: IDeletePlantationRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    updatePlantation = module.get<DeletePlantation>(DeletePlantation)
    findPlantationByIdRepository = module.get<
      jest.Mocked<IFindPlantationByIdRepository>
    >(IFindPlantationByIdRepository)
    deletePlantationRepository = module.get<
      jest.Mocked<IDeletePlantationRepository>
    >(IDeletePlantationRepository)
  })

  it('should throw NotFoundException if plantation does not exist', async () => {
    findPlantationByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = updatePlantation.delete('any-plantation-id')

    await expect(promise).rejects.toThrow(
      new NotFoundException('Plantação não encontrada')
    )
    expect(findPlantationByIdRepository.findById).toHaveBeenCalledWith(
      'any-plantation-id'
    )
  })

  it('should delete plantation on success', async () => {
    const plantation = mockPlantation()
    findPlantationByIdRepository.findById.mockResolvedValueOnce(plantation)

    const promise = updatePlantation.delete('any-plantation-id')

    await expect(promise).resolves.toBeUndefined()
    expect(deletePlantationRepository.delete).toHaveBeenCalledWith(plantation)
  })
})
