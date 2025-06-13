import { IUpdateProducer } from '#domain/usecases/producer/update-producer.js'
import {
  UpdateProducerBodyDto,
  UpdateProducerController,
} from '#presentation/controllers/producer/update-producer.controller.js'
import { ProducerMapper } from '#presentation/mappers/producer.mapper.js'
import { createMockParams, mockProducer } from '#tests/helpers/mock-domain.js'
import { validate } from '#tests/helpers/setup-test.js'
import { Test } from '@nestjs/testing'

const mockBody = createMockParams<UpdateProducerBodyDto>(() => ({
  producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  document: '67.567.234/0001-96',
}))

describe('CrateProducerController', () => {
  describe('Body Validation', () => {
    it('should fail if missing inputs', async () => {
      const body = new UpdateProducerBodyDto()

      const errors = await validate(body)

      expect(errors).toStrictEqual({
        document: 'Campo obrigatório',
        email: 'Campo obrigatório',
        firstName: 'Campo obrigatório',
        lastName: 'Campo obrigatório',
        producerId: 'Campo obrigatório',
      })
    })

    it('should pass validation with correct inputs', async () => {
      const body = new UpdateProducerBodyDto()
      body.producerId = '704c84f2-1111-4587-9abc-b03b30f32d87'
      body.firstName = 'John'
      body.lastName = 'Doe'
      body.email = 'john.doe@example.com'
      body.document = '67.567.234/0001-96'

      const errors = await validate(body)

      expect(errors).toStrictEqual({})
    })
  })

  describe('Handler', () => {
    let controller: UpdateProducerController
    let updateProducerService: jest.Mocked<IUpdateProducer>

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [UpdateProducerController],
        providers: [
          {
            provide: IUpdateProducer,
            useValue: {
              update: jest.fn(() => mockProducer()),
            },
          },
        ],
      }).compile()

      controller = module.get<UpdateProducerController>(
        UpdateProducerController
      )
      updateProducerService =
        module.get<jest.Mocked<IUpdateProducer>>(IUpdateProducer)
    })

    it('should call service with right params', async () => {
      const body = mockBody()

      await controller.handle(body)

      expect(updateProducerService.update).toHaveBeenCalledWith({
        producerId: body.producerId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        document: body.document,
      })
    })

    it('should return ProducerDto on success', async () => {
      const body = mockBody()
      const producer = mockProducer()
      updateProducerService.update.mockResolvedValueOnce(producer)

      const result = await controller.handle(body)

      expect(result).toStrictEqual(ProducerMapper.toDto(producer))
    })
  })
})
