import { Plantation } from '#domain/entities/plantation.js'
import type { ICreatePlantation } from '#domain/usecases/plantation/create-plantation.js'
import { ICreatePlantationRepository } from '#services/protocols/database/plantation-repository.js'
import { IFindSafraByIdRepository } from '#services/protocols/database/safra-repository.js'
import { CreatePlantation } from '#services/usecases/plantation/create-plantation.service.js'
import {
  createMockParams,
  mockPlantation,
  mockProperty,
} from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

const mockParams = createMockParams<ICreatePlantation.Params>(() => ({
  safraId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Milho',
}))

describe('CreatePlantation', () => {
  let createPlantationService: CreatePlantation
  let findSafraByIdRepository: jest.Mocked<IFindSafraByIdRepository>
  let createPlantationRepository: jest.Mocked<ICreatePlantationRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreatePlantation,
        {
          provide: IFindSafraByIdRepository,
          useValue: {
            findById: jest.fn(() => mockProperty()),
          },
        },
        {
          provide: ICreatePlantationRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile()

    createPlantationService = module.get<CreatePlantation>(CreatePlantation)
    findSafraByIdRepository = module.get<jest.Mocked<IFindSafraByIdRepository>>(
      IFindSafraByIdRepository
    )
    createPlantationRepository = module.get<
      jest.Mocked<ICreatePlantationRepository>
    >(ICreatePlantationRepository)
  })

  it('should throw NotFoundException if plantation is invalid', async () => {
    const params = mockParams()
    findSafraByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = createPlantationService.create(params)

    await expect(promise).rejects.toThrow(
      new NotFoundException('Safra não encontrada')
    )
    expect(findSafraByIdRepository.findById).toHaveBeenCalledWith(
      params.safraId
    )
  })

  it('should create a new plantation', async () => {
    const params = mockParams()
    const plantation = mockPlantation()
    jest.spyOn(Plantation, 'create').mockReturnValueOnce(plantation)

    await createPlantationService.create(params)

    expect(createPlantationRepository.create).toHaveBeenCalledWith(plantation)
    expect(Plantation.create).toHaveBeenCalledWith({
      safraId: params.safraId,
      name: params.name,
    })
  })

  it('should return the created plantation', async () => {
    const params = mockParams()
    const plantation = mockPlantation()
    jest.spyOn(Plantation, 'create').mockReturnValueOnce(plantation)

    const result = await createPlantationService.create(params)

    expect(result).toStrictEqual(plantation)
    expect(createPlantationRepository.create).toHaveBeenCalledWith(plantation)
  })
})
