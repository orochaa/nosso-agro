import { Safra } from '#domain/entities/safra.js'
import type { ICreateSafra } from '#domain/usecases/safra/create-safra.js'
import { IFindPropertyByIdRepository } from '#services/protocols/database/property-repository.js'
import { ICreateSafraRepository } from '#services/protocols/database/safra-repository.js'
import { CreateSafra } from '#services/usecases/safra/create-safra.service.js'
import {
  createMockParams,
  mockProperty,
  mockSafra,
} from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

const mockParams = createMockParams<ICreateSafra.Params>(() => ({
  propertyId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Safra 2023/2024',
}))

describe('CreateSafra', () => {
  let createSafraService: CreateSafra
  let findPropertyByIdRepository: jest.Mocked<IFindPropertyByIdRepository>
  let createSafraRepository: jest.Mocked<ICreateSafraRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateSafra,
        {
          provide: IFindPropertyByIdRepository,
          useValue: {
            findById: jest.fn(() => mockProperty()),
          },
        },
        {
          provide: ICreateSafraRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile()

    createSafraService = module.get<CreateSafra>(CreateSafra)
    findPropertyByIdRepository = module.get<
      jest.Mocked<IFindPropertyByIdRepository>
    >(IFindPropertyByIdRepository)
    createSafraRepository = module.get<jest.Mocked<ICreateSafraRepository>>(
      ICreateSafraRepository
    )
  })

  it('should throw NotFoundException if safra is invalid', async () => {
    const params = mockParams()
    findPropertyByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = createSafraService.create(params)

    await expect(promise).rejects.toThrow(
      new NotFoundException('Propriedade não encontrada')
    )
    expect(findPropertyByIdRepository.findById).toHaveBeenCalledWith(
      params.propertyId
    )
  })

  it('should create a new safra', async () => {
    const params = mockParams()
    const safra = mockSafra()
    jest.spyOn(Safra, 'create').mockReturnValueOnce(safra)

    await createSafraService.create(params)

    expect(createSafraRepository.create).toHaveBeenCalledWith(safra)
    expect(Safra.create).toHaveBeenCalledWith({
      propertyId: params.propertyId,
      name: params.name,
    })
  })

  it('should return the created safra', async () => {
    const params = mockParams()
    const safra = mockSafra()
    jest.spyOn(Safra, 'create').mockReturnValueOnce(safra)

    const result = await createSafraService.create(params)

    expect(result).toStrictEqual(safra)
    expect(createSafraRepository.create).toHaveBeenCalledWith(safra)
  })
})
