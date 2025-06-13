import {
  IDeleteSafraRepository,
  IFindSafraByIdRepository,
} from '#services/protocols/database/safra-repository.js'
import { DeleteSafra } from '#services/usecases/safra/delete-safra.service.js'
import { mockSafra } from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

describe('DeleteSafra', () => {
  let updateSafra: DeleteSafra
  let findSafraByIdRepository: jest.Mocked<IFindSafraByIdRepository>
  let deleteSafraRepository: jest.Mocked<IDeleteSafraRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteSafra,
        {
          provide: IFindSafraByIdRepository,
          useValue: {
            findById: jest.fn(() => mockSafra()),
          },
        },
        {
          provide: IDeleteSafraRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    updateSafra = module.get<DeleteSafra>(DeleteSafra)
    findSafraByIdRepository = module.get<jest.Mocked<IFindSafraByIdRepository>>(
      IFindSafraByIdRepository
    )
    deleteSafraRepository = module.get<jest.Mocked<IDeleteSafraRepository>>(
      IDeleteSafraRepository
    )
  })

  it('should throw NotFoundException if safra does not exist', async () => {
    findSafraByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = updateSafra.delete('any-safra-id')

    await expect(promise).rejects.toThrow(
      new NotFoundException('Safra não encontrada')
    )
    expect(findSafraByIdRepository.findById).toHaveBeenCalledWith(
      'any-safra-id'
    )
  })

  it('should delete safra on success', async () => {
    const safra = mockSafra()
    findSafraByIdRepository.findById.mockResolvedValueOnce(safra)

    const promise = updateSafra.delete('any-safra-id')

    await expect(promise).resolves.toBeUndefined()
    expect(deleteSafraRepository.delete).toHaveBeenCalledWith(safra)
  })
})
