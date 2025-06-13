import { IDeletePlantation } from '#domain/usecases/plantation/delete-plantation.js'
import { DeletePlantationController } from '#presentation/controllers/plantation/delete-plantation.controller.js'
import { Test } from '@nestjs/testing'

describe('DeletePlantationController', () => {
  let controller: DeletePlantationController
  let deletePlantationService: jest.Mocked<IDeletePlantation>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [DeletePlantationController],
      providers: [
        {
          provide: IDeletePlantation,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<DeletePlantationController>(DeletePlantationController)
    deletePlantationService =
      module.get<jest.Mocked<IDeletePlantation>>(IDeletePlantation)
  })

  it('should call service with right params', async () => {
    const plantationId = '554ed210-e72a-47b5-b1e6-17ab33dd4871'

    await controller.handle(plantationId)

    expect(deletePlantationService.delete).toHaveBeenCalledWith(plantationId)
  })

  it('should return undefined on success', async () => {
    const plantationId = '554ed210-e72a-47b5-b1e6-17ab33dd4871'

    const promise = controller.handle(plantationId)

    await expect(promise).resolves.toBeUndefined()
  })
})
