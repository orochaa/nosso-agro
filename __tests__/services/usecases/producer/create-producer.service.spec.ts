import { Producer } from '#domain/entities/producer.js'
import type { ICreateProducer } from '#domain/usecases/producer/create-producer.js'
import { IHashGenerator } from '#services/protocols/data/hasher.js'
import { ISendUserCredentials } from '#services/protocols/data/mailer.js'
import {
  ICreateProducerRepository,
  IFindProducerByEmailRepository,
} from '#services/protocols/database/producer-repository.js'
import { CreateProducer } from '#services/usecases/producer/create-producer.service.js'
import { createMockParams, mockProducer } from '#tests/helpers/mock-domain.js'
import { BadRequestException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

const mockParams = createMockParams<ICreateProducer.Params>(() => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  document: '67.567.234/0001-96',
}))

describe('CreateProducer', () => {
  let createProducerService: CreateProducer
  let findProducerByEmailRepository: jest.Mocked<IFindProducerByEmailRepository>
  let createProducerRepository: jest.Mocked<ICreateProducerRepository>
  let hashGenerator: jest.Mocked<IHashGenerator>
  let sendUserCredentials: jest.Mocked<ISendUserCredentials>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateProducer,
        {
          provide: IFindProducerByEmailRepository,
          useValue: {
            findByEmail: jest.fn(() => null),
          },
        },
        {
          provide: ICreateProducerRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: IHashGenerator,
          useValue: {
            generate: jest.fn(() => 'password-hash'),
          },
        },
        {
          provide: ISendUserCredentials,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile()

    createProducerService = module.get<CreateProducer>(CreateProducer)
    findProducerByEmailRepository = module.get<
      jest.Mocked<IFindProducerByEmailRepository>
    >(IFindProducerByEmailRepository)
    createProducerRepository = module.get<
      jest.Mocked<ICreateProducerRepository>
    >(ICreateProducerRepository)
    hashGenerator = module.get<jest.Mocked<IHashGenerator>>(IHashGenerator)
    sendUserCredentials =
      module.get<jest.Mocked<ISendUserCredentials>>(ISendUserCredentials)
  })

  it('should throw BadRequestException if a producer with the same name already exists', async () => {
    const params = mockParams()
    findProducerByEmailRepository.findByEmail.mockResolvedValueOnce(
      mockProducer()
    )

    const promise = createProducerService.create(params)

    await expect(promise).rejects.toThrow(
      new BadRequestException('Produtor já cadastrado')
    )
    expect(findProducerByEmailRepository.findByEmail).toHaveBeenCalledWith(
      params.email
    )
  })

  it('should generate a password hash', async () => {
    const params = mockParams()

    await createProducerService.create(params)

    expect(hashGenerator.generate).toHaveBeenCalledWith(expect.any(String))
  })

  it('should create a new producer', async () => {
    const params = mockParams()
    const producer = mockProducer()
    jest.spyOn(Producer, 'create').mockReturnValueOnce(producer)

    await createProducerService.create(params)

    expect(createProducerRepository.create).toHaveBeenCalledWith(producer)
    expect(Producer.create).toHaveBeenCalledWith({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      document: params.document,
      passwordHash: 'password-hash',
    })
  })

  it('should send user credentials', async () => {
    const params = mockParams()
    const producer = mockProducer()
    jest.spyOn(Producer, 'create').mockReturnValueOnce(producer)

    await createProducerService.create(params)

    expect(sendUserCredentials.sendMail).toHaveBeenCalledWith({
      email: producer.email,
      firstName: producer.firstName,
      password: expect.any(String),
    })
  })

  it('should return the created producer', async () => {
    const params = mockParams()
    const producer = mockProducer()
    jest.spyOn(Producer, 'create').mockReturnValueOnce(producer)

    const result = await createProducerService.create(params)

    expect(result).toStrictEqual(producer)
    expect(createProducerRepository.create).toHaveBeenCalledWith(producer)
  })
})
