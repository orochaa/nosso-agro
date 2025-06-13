import type { IUpdateProperty } from '#domain/usecases/property/update-property.js'
import {
  IFindPropertyByIdRepository,
  IUpdatePropertyRepository,
} from '#services/protocols/database/property-repository.js'
import { UpdateProperty } from '#services/usecases/property/update-property.service.js'
import { createMockParams, mockProperty } from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

const mockParams = createMockParams<IUpdateProperty.Params>(() => ({
  propertyId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Fazenda Feliz',
  state: 'SP',
  city: 'São Paulo',
  totalArea: 1000,
  agriculturalArea: 800,
  vegetationArea: 200,
}))

describe('UpdateProperty', () => {
  let updateProperty: UpdateProperty
  let findPropertyByIdRepository: jest.Mocked<IFindPropertyByIdRepository>
  let updatePropertyRepository: jest.Mocked<IUpdatePropertyRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateProperty,
        {
          provide: IFindPropertyByIdRepository,
          useValue: {
            findById: jest.fn(() => mockProperty()),
          },
        },
        {
          provide: IUpdatePropertyRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    updateProperty = module.get<UpdateProperty>(UpdateProperty)
    findPropertyByIdRepository = module.get<
      jest.Mocked<IFindPropertyByIdRepository>
    >(IFindPropertyByIdRepository)
    updatePropertyRepository = module.get<
      jest.Mocked<IUpdatePropertyRepository>
    >(IUpdatePropertyRepository)
  })

  it('should throw NotFoundException if property does not exist', async () => {
    const params = mockParams()
    findPropertyByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = updateProperty.update(params)

    await expect(promise).rejects.toThrow(
      new NotFoundException('Propriedade não encontrada')
    )
    expect(findPropertyByIdRepository.findById).toHaveBeenCalledWith(
      params.propertyId
    )
  })

  it('should update property', async () => {
    const params = mockParams()
    const property = mockProperty()
    findPropertyByIdRepository.findById.mockResolvedValueOnce(property)

    await updateProperty.update(params)

    expect(updatePropertyRepository.update).toHaveBeenCalledWith(property)
    expect(property.name).toBe(params.name)
  })

  it('should return the updated property', async () => {
    const params = mockParams()
    const property = mockProperty()
    findPropertyByIdRepository.findById.mockResolvedValueOnce(property)

    const result = await updateProperty.update(params)

    expect(result).toStrictEqual(property)
    expect(updatePropertyRepository.update).toHaveBeenCalledWith(property)
  })
})
