import type { IUpdatePlantation } from '#domain/usecases/plantation/update-plantation.js'
import {
  IFindPlantationByIdRepository,
  IUpdatePlantationRepository,
} from '#services/protocols/database/plantation-repository.js'
import { UpdatePlantation } from '#services/usecases/plantation/update-plantation.service.js'
import { createMockParams, mockPlantation } from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

const mockParams = createMockParams<IUpdatePlantation.Params>(() => ({
  plantationId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: '2023/2024',
}))

describe('UpdatePlantation', () => {
  let updatePlantation: UpdatePlantation
  let findPlantationByIdRepository: jest.Mocked<IFindPlantationByIdRepository>
  let updatePlantationRepository: jest.Mocked<IUpdatePlantationRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdatePlantation,
        {
          provide: IFindPlantationByIdRepository,
          useValue: {
            findById: jest.fn(() => mockPlantation()),
          },
        },
        {
          provide: IUpdatePlantationRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    updatePlantation = module.get<UpdatePlantation>(UpdatePlantation)
    findPlantationByIdRepository = module.get<
      jest.Mocked<IFindPlantationByIdRepository>
    >(IFindPlantationByIdRepository)
    updatePlantationRepository = module.get<
      jest.Mocked<IUpdatePlantationRepository>
    >(IUpdatePlantationRepository)
  })

  it('should throw NotFoundException if plantation does not exist', async () => {
    const params = mockParams()
    findPlantationByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = updatePlantation.update(params)

    await expect(promise).rejects.toThrow(
      new NotFoundException('Plantação não encontrada')
    )
    expect(findPlantationByIdRepository.findById).toHaveBeenCalledWith(
      params.plantationId
    )
  })

  it('should update plantation', async () => {
    const params = mockParams()
    const plantation = mockPlantation()
    findPlantationByIdRepository.findById.mockResolvedValueOnce(plantation)

    await updatePlantation.update(params)

    expect(updatePlantationRepository.update).toHaveBeenCalledWith(plantation)
    expect(plantation.name).toBe(params.name)
  })

  it('should return the updated plantation', async () => {
    const params = mockParams()
    const plantation = mockPlantation()
    findPlantationByIdRepository.findById.mockResolvedValueOnce(plantation)

    const result = await updatePlantation.update(params)

    expect(result).toStrictEqual(plantation)
    expect(updatePlantationRepository.update).toHaveBeenCalledWith(plantation)
  })
})
