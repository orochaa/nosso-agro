import { ICreateProperty } from '#domain/usecases/property/create-property.js'
import {
  CreatePropertyBodyDto,
  CreatePropertyController,
} from '#presentation/controllers/property/create-property.controller.js'
import { PropertyMapper } from '#presentation/mappers/property.mapper.js'
import { createMockParams, mockProperty } from '#tests/helpers/mock-domain.js'
import { validate } from '#tests/helpers/setup-test.js'
import { Test } from '@nestjs/testing'

const mockBody = createMockParams<CreatePropertyBodyDto>(() => ({
  producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Fazenda Feliz',
  city: 'São Paulo',
  state: 'SP',
  totalArea: 1000,
  vegetationArea: 500,
  arableArea: 500,
}))

describe('CratePropertyController', () => {
  describe('Body Validation', () => {
    it('should fail if missing inputs', async () => {
      const body = new CreatePropertyBodyDto()

      const errors = await validate(body)

      expect(errors).toStrictEqual({
        producerId: 'Campo obrigatório',
        name: 'Campo obrigatório',
        city: 'Campo obrigatório',
        state: 'Campo obrigatório',
        totalArea: 'Campo obrigatório',
        vegetationArea: 'Campo obrigatório',
        arableArea: 'Campo obrigatório',
      })
    })

    it('should pass validation with correct inputs', async () => {
      const body = new CreatePropertyBodyDto()
      body.producerId = '704c84f2-1111-4587-9abc-b03b30f32d87'
      body.name = 'Fazenda Feliz'
      body.city = 'São Paulo'
      body.state = 'SP'
      body.totalArea = 1000
      body.vegetationArea = 500
      body.arableArea = 500

      const errors = await validate(body)

      expect(errors).toStrictEqual({})
    })
  })

  describe('Handler', () => {
    let controller: CreatePropertyController
    let createPropertyService: jest.Mocked<ICreateProperty>

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [CreatePropertyController],
        providers: [
          {
            provide: ICreateProperty,
            useValue: {
              create: jest.fn(() => mockProperty()),
            },
          },
        ],
      }).compile()

      controller = module.get<CreatePropertyController>(
        CreatePropertyController
      )
      createPropertyService =
        module.get<jest.Mocked<ICreateProperty>>(ICreateProperty)
    })

    it('should call service with right params', async () => {
      const body = mockBody()

      await controller.handle(body)

      expect(createPropertyService.create).toHaveBeenCalledWith({
        producerId: body.producerId,
        name: body.name,
        city: body.city,
        state: body.state,
        totalArea: body.totalArea,
        vegetationArea: body.vegetationArea,
        arableArea: body.arableArea,
      })
    })

    it('should return PropertyDto on success', async () => {
      const body = mockBody()
      const property = mockProperty()
      createPropertyService.create.mockResolvedValueOnce(property)

      const result = await controller.handle(body)

      expect(result).toStrictEqual(PropertyMapper.toDto(property))
    })
  })
})
