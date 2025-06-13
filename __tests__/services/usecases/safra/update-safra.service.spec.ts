import type { IUpdateSafra } from '#domain/usecases/safra/update-safra.js'
import {
  IFindSafraByIdRepository,
  IUpdateSafraRepository,
} from '#services/protocols/database/safra-repository.js'
import { UpdateSafra } from '#services/usecases/safra/update-safra.service.js'
import { createMockParams, mockSafra } from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

const mockParams = createMockParams<IUpdateSafra.Params>(() => ({
  safraId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: '2023/2024',
}))

describe('UpdateSafra', () => {
  let updateSafra: UpdateSafra
  let findSafraByIdRepository: jest.Mocked<IFindSafraByIdRepository>
  let updateSafraRepository: jest.Mocked<IUpdateSafraRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateSafra,
        {
          provide: IFindSafraByIdRepository,
          useValue: {
            findById: jest.fn(() => mockSafra()),
          },
        },
        {
          provide: IUpdateSafraRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    updateSafra = module.get<UpdateSafra>(UpdateSafra)
    findSafraByIdRepository = module.get<jest.Mocked<IFindSafraByIdRepository>>(
      IFindSafraByIdRepository
    )
    updateSafraRepository = module.get<jest.Mocked<IUpdateSafraRepository>>(
      IUpdateSafraRepository
    )
  })

  it('should throw NotFoundException if safra does not exist', async () => {
    const params = mockParams()
    findSafraByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = updateSafra.update(params)

    await expect(promise).rejects.toThrow(
      new NotFoundException('Safra não encontrada')
    )
    expect(findSafraByIdRepository.findById).toHaveBeenCalledWith(
      params.safraId
    )
  })

  it('should update safra', async () => {
    const params = mockParams()
    const safra = mockSafra()
    findSafraByIdRepository.findById.mockResolvedValueOnce(safra)

    await updateSafra.update(params)

    expect(updateSafraRepository.update).toHaveBeenCalledWith(safra)
    expect(safra.name).toBe(params.name)
  })

  it('should return the updated safra', async () => {
    const params = mockParams()
    const safra = mockSafra()
    findSafraByIdRepository.findById.mockResolvedValueOnce(safra)

    const result = await updateSafra.update(params)

    expect(result).toStrictEqual(safra)
    expect(updateSafraRepository.update).toHaveBeenCalledWith(safra)
  })
})
