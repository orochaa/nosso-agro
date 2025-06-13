import { IDeleteProducer } from '#domain/usecases/producer/delete-producer.js'
import { DeleteProducerController } from '#presentation/controllers/producer/delete-producer.controller.js'
import { Test } from '@nestjs/testing'

describe('DeleteProducerController', () => {
  let controller: DeleteProducerController
  let deleteProducerService: jest.Mocked<IDeleteProducer>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [DeleteProducerController],
      providers: [
        {
          provide: IDeleteProducer,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<DeleteProducerController>(DeleteProducerController)
    deleteProducerService =
      module.get<jest.Mocked<IDeleteProducer>>(IDeleteProducer)
  })

  it('should call service with right params', async () => {
    const producerId = '554ed210-e72a-47b5-b1e6-17ab33dd4871'

    await controller.handle(producerId)

    expect(deleteProducerService.delete).toHaveBeenCalledWith(producerId)
  })

  it('should return undefined on success', async () => {
    const producerId = '554ed210-e72a-47b5-b1e6-17ab33dd4871'

    const promise = controller.handle(producerId)

    await expect(promise).resolves.toBeUndefined()
  })
})
