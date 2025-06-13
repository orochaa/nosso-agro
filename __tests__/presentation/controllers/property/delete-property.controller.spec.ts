import { IDeleteProperty } from '#domain/usecases/property/delete-property.js'
import { DeletePropertyController } from '#presentation/controllers/property/delete-property.controller.js'
import { Test } from '@nestjs/testing'

describe('DeletePropertyController', () => {
  let controller: DeletePropertyController
  let deletePropertyService: jest.Mocked<IDeleteProperty>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [DeletePropertyController],
      providers: [
        {
          provide: IDeleteProperty,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<DeletePropertyController>(DeletePropertyController)
    deletePropertyService =
      module.get<jest.Mocked<IDeleteProperty>>(IDeleteProperty)
  })

  it('should call service with right params', async () => {
    const propertyId = '554ed210-e72a-47b5-b1e6-17ab33dd4871'

    await controller.handle(propertyId)

    expect(deletePropertyService.delete).toHaveBeenCalledWith(propertyId)
  })

  it('should return undefined on success', async () => {
    const propertyId = '554ed210-e72a-47b5-b1e6-17ab33dd4871'

    const promise = controller.handle(propertyId)

    await expect(promise).resolves.toBeUndefined()
  })
})
