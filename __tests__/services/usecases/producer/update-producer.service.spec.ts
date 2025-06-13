import type { IUpdateProducer } from '#domain/usecases/producer/update-producer.js'
import {
  IFindProducerByEmailRepository,
  IFindProducerByIdRepository,
  IUpdateProducerRepository,
} from '#services/protocols/database/producer-repository.js'
import { UpdateProducer } from '#services/usecases/producer/update-producer.service.js'
import { createMockParams, mockProducer } from '#tests/helpers/mock-domain.js'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

const mockParams = createMockParams<IUpdateProducer.Params>(() => ({
  producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  firstName: 'Maria',
  lastName: 'Doe',
  email: 'maria.doe@example.com',
  document: '67.567.234/0001-96',
}))

describe('UpdateProducer', () => {
  let updateProducer: UpdateProducer
  let findProducerByIdRepository: jest.Mocked<IFindProducerByIdRepository>
  let findProducerByEmailRepository: jest.Mocked<IFindProducerByEmailRepository>
  let updateProducerRepository: jest.Mocked<IUpdateProducerRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateProducer,
        {
          provide: IFindProducerByIdRepository,
          useValue: {
            findById: jest.fn(() => mockProducer()),
          },
        },
        {
          provide: IFindProducerByEmailRepository,
          useValue: {
            findByEmail: jest.fn(() => null),
          },
        },
        {
          provide: IUpdateProducerRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    updateProducer = module.get<UpdateProducer>(UpdateProducer)
    findProducerByIdRepository = module.get<
      jest.Mocked<IFindProducerByIdRepository>
    >(IFindProducerByIdRepository)
    updateProducerRepository = module.get<
      jest.Mocked<IUpdateProducerRepository>
    >(IUpdateProducerRepository)
    findProducerByEmailRepository = module.get<
      jest.Mocked<IFindProducerByEmailRepository>
    >(IFindProducerByEmailRepository)
  })

  it('should throw NotFoundException if producer does not exist', async () => {
    const params = mockParams()
    findProducerByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = updateProducer.update(params)

    await expect(promise).rejects.toThrow(
      new NotFoundException('Produtor não encontrado')
    )
    expect(findProducerByIdRepository.findById).toHaveBeenCalledWith(
      params.producerId
    )
  })

  it('should throw BadRequestException if email is already being used', async () => {
    const params = mockParams()
    findProducerByEmailRepository.findByEmail.mockResolvedValueOnce(
      mockProducer()
    )

    const promise = updateProducer.update(params)

    await expect(promise).rejects.toThrow(
      new BadRequestException('Email já cadastrado')
    )
    expect(findProducerByIdRepository.findById).toHaveBeenCalledWith(
      params.producerId
    )
  })

  it('should update producer', async () => {
    const params = mockParams()
    const producer = mockProducer()
    findProducerByIdRepository.findById.mockResolvedValueOnce(producer)

    await updateProducer.update(params)

    expect(updateProducerRepository.update).toHaveBeenCalledWith(producer)
    expect(producer.firstName).toBe(params.firstName)
  })

  it('should return the updated producer', async () => {
    const params = mockParams()
    const producer = mockProducer()
    findProducerByIdRepository.findById.mockResolvedValueOnce(producer)

    const result = await updateProducer.update(params)

    expect(result).toStrictEqual(producer)
    expect(updateProducerRepository.update).toHaveBeenCalledWith(producer)
  })
})
