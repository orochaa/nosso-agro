import { Property } from '#domain/entities/property.js'
import type { ICreateProperty } from '#domain/usecases/property/create-property.js'
import { IFindProducerByIdRepository } from '#services/protocols/database/producer-repository.js'
import { ICreatePropertyRepository } from '#services/protocols/database/property-repository.js'
import { CreateProperty } from '#services/usecases/property/create-property.service.js'
import {
  createMockParams,
  mockProducer,
  mockProperty,
} from '#tests/helpers/mock-domain.js'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

const mockParams = createMockParams<ICreateProperty.Params>(() => ({
  name: 'Fazenda Feliz',
  producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  document: '67.567.234/0001-96',
  state: 'SP',
  city: 'São Paulo',
  totalArea: 1000,
  agriculturalArea: 800,
  vegetationArea: 200,
}))

describe('CreateProperty', () => {
  let createPropertyService: CreateProperty
  let findProducerByIdRepository: jest.Mocked<IFindProducerByIdRepository>
  let createPropertyRepository: jest.Mocked<ICreatePropertyRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateProperty,
        {
          provide: IFindProducerByIdRepository,
          useValue: {
            findById: jest.fn(() => mockProducer()),
          },
        },
        {
          provide: ICreatePropertyRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile()

    createPropertyService = module.get<CreateProperty>(CreateProperty)
    findProducerByIdRepository = module.get<
      jest.Mocked<IFindProducerByIdRepository>
    >(IFindProducerByIdRepository)
    createPropertyRepository = module.get<
      jest.Mocked<ICreatePropertyRepository>
    >(ICreatePropertyRepository)
  })

  it('should throw NotFoundException if producer is invalid', async () => {
    const params = mockParams()
    findProducerByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = createPropertyService.create(params)

    await expect(promise).rejects.toThrow(
      new NotFoundException('Produtor não encontrado')
    )
    expect(findProducerByIdRepository.findById).toHaveBeenCalledWith(
      params.producerId
    )
  })

  it('should throw BadRequestException if total area is less than agricultural area + vegetation area', async () => {
    const params = mockParams({
      totalArea: 100,
      agriculturalArea: 80,
      vegetationArea: 30,
    })

    const promise = createPropertyService.create(params)

    await expect(promise).rejects.toThrow(
      new BadRequestException(
        'A área total não pode ser menor que a soma da área arável e da área de vegetação'
      )
    )
  })

  it('should create a new property', async () => {
    const params = mockParams()
    const property = mockProperty()
    jest.spyOn(Property, 'create').mockReturnValueOnce(property)

    await createPropertyService.create(params)

    expect(createPropertyRepository.create).toHaveBeenCalledWith(property)
    expect(Property.create).toHaveBeenCalledWith({
      producerId: params.producerId,
      name: params.name,
      city: params.city,
      state: params.state,
      agriculturalArea: params.agriculturalArea,
      totalArea: params.totalArea,
      vegetationArea: params.vegetationArea,
    })
  })

  it('should return the created property', async () => {
    const params = mockParams()
    const property = mockProperty()
    jest.spyOn(Property, 'create').mockReturnValueOnce(property)

    const result = await createPropertyService.create(params)

    expect(result).toStrictEqual(property)
    expect(createPropertyRepository.create).toHaveBeenCalledWith(property)
  })
})
