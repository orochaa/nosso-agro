import { ICreateProducer } from '#domain/usecases/producer/create-producer.js'
import {
  CreateProducerBodyDto,
  CreateProducerController,
} from '#presentation/controllers/producer/create-producer.controller.js'
import { ProducerMapper } from '#presentation/mappers/producer.mapper.js'
import { createMockParams, mockProducer } from '#tests/helpers/mock-domain.js'
import { validate } from '#tests/helpers/setup-test.js'
import { Test } from '@nestjs/testing'

const mockBody = createMockParams<CreateProducerBodyDto>(() => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  document: '67.567.234/0001-96',
}))

describe('CrateProducerController', () => {
  describe('Body Validation', () => {
    it('should fail if missing inputs', async () => {
      const body = new CreateProducerBodyDto()

      const errors = await validate(body)

      expect(errors).toStrictEqual({
        firstName: 'Campo obrigatório',
        lastName: 'Campo obrigatório',
        email: 'Campo obrigatório',
        document: 'Campo obrigatório',
      })
    })

    it('should pass validation with correct inputs', async () => {
      const body = new CreateProducerBodyDto()
      body.firstName = 'John'
      body.lastName = 'Doe'
      body.email = 'john.doe@example.com'
      body.document = '67.567.234/0001-96'

      const errors = await validate(body)

      expect(errors).toStrictEqual({})
    })
  })

  describe('Handler', () => {
    let controller: CreateProducerController
    let createProducerService: jest.Mocked<ICreateProducer>

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [CreateProducerController],
        providers: [
          {
            provide: ICreateProducer,
            useValue: {
              create: jest.fn(() => mockProducer()),
            },
          },
        ],
      }).compile()

      controller = module.get<CreateProducerController>(
        CreateProducerController
      )
      createProducerService =
        module.get<jest.Mocked<ICreateProducer>>(ICreateProducer)
    })

    it('should call service with right params', async () => {
      const body = mockBody()

      await controller.handle(body)

      expect(createProducerService.create).toHaveBeenCalledWith({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        document: body.document,
      })
    })

    it('should return ProducerDto on success', async () => {
      const body = mockBody()
      const producer = mockProducer()
      createProducerService.create.mockResolvedValueOnce(producer)

      const result = await controller.handle(body)

      expect(result).toStrictEqual(ProducerMapper.toDto(producer))
    })
  })
})
