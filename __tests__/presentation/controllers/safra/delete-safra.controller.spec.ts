import { IDeleteSafra } from '#domain/usecases/safra/delete-safra.js'
import { DeleteSafraController } from '#presentation/controllers/safra/delete-safra.controller.js'
import { Test } from '@nestjs/testing'

describe('DeleteSafraController', () => {
  let controller: DeleteSafraController
  let deleteSafraService: jest.Mocked<IDeleteSafra>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [DeleteSafraController],
      providers: [
        {
          provide: IDeleteSafra,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<DeleteSafraController>(DeleteSafraController)
    deleteSafraService = module.get<jest.Mocked<IDeleteSafra>>(IDeleteSafra)
  })

  it('should call service with right params', async () => {
    const safraId = '554ed210-e72a-47b5-b1e6-17ab33dd4871'

    await controller.handle(safraId)

    expect(deleteSafraService.delete).toHaveBeenCalledWith(safraId)
  })

  it('should return undefined on success', async () => {
    const safraId = '554ed210-e72a-47b5-b1e6-17ab33dd4871'

    const promise = controller.handle(safraId)

    await expect(promise).resolves.toBeUndefined()
  })
})
