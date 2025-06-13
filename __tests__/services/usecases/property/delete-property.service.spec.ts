import {
  IDeletePropertyRepository,
  IFindPropertyByIdRepository,
} from '#services/protocols/database/property-repository.js'
import { DeleteProperty } from '#services/usecases/property/delete-property.service.js'
import { mockProperty } from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

describe('DeleteProperty', () => {
  let updateProperty: DeleteProperty
  let findPropertyByIdRepository: jest.Mocked<IFindPropertyByIdRepository>
  let deletePropertyRepository: jest.Mocked<IDeletePropertyRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteProperty,
        {
          provide: IFindPropertyByIdRepository,
          useValue: {
            findById: jest.fn(() => mockProperty()),
          },
        },
        {
          provide: IDeletePropertyRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    updateProperty = module.get<DeleteProperty>(DeleteProperty)
    findPropertyByIdRepository = module.get<
      jest.Mocked<IFindPropertyByIdRepository>
    >(IFindPropertyByIdRepository)
    deletePropertyRepository = module.get<
      jest.Mocked<IDeletePropertyRepository>
    >(IDeletePropertyRepository)
  })

  it('should throw NotFoundException if property does not exist', async () => {
    findPropertyByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = updateProperty.delete('any-property-id')

    await expect(promise).rejects.toThrow(
      new NotFoundException('Propriedade não encontrada')
    )
    expect(findPropertyByIdRepository.findById).toHaveBeenCalledWith(
      'any-property-id'
    )
  })

  it('should delete property on success', async () => {
    const property = mockProperty()
    findPropertyByIdRepository.findById.mockResolvedValueOnce(property)

    const promise = updateProperty.delete('any-property-id')

    await expect(promise).resolves.toBeUndefined()
    expect(deletePropertyRepository.delete).toHaveBeenCalledWith(property)
  })
})
