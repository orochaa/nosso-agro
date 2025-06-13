import { ICreateSafra } from '#domain/usecases/safra/create-safra.js'
import {
  CreateSafraBodyDto,
  CreateSafraController,
} from '#presentation/controllers/safra/create-safra.controller.js'
import { SafraMapper } from '#presentation/mappers/safra.mapper.js'
import { createMockParams, mockSafra } from '#tests/helpers/mock-domain.js'
import { validate } from '#tests/helpers/setup-test.js'
import { Test } from '@nestjs/testing'

const mockBody = createMockParams<CreateSafraBodyDto>(() => ({
  propertyId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: '2021',
}))

describe('CrateSafraController', () => {
  describe('Body Validation', () => {
    it('should fail if missing inputs', async () => {
      const body = new CreateSafraBodyDto()

      const errors = await validate(body)

      expect(errors).toStrictEqual({
        propertyId: 'Campo obrigatório',
        name: 'Campo obrigatório',
      })
    })

    it('should pass validation with correct inputs', async () => {
      const body = new CreateSafraBodyDto()
      body.propertyId = '704c84f2-1111-4587-9abc-b03b30f32d87'
      body.name = '2022'

      const errors = await validate(body)

      expect(errors).toStrictEqual({})
    })
  })

  describe('Handler', () => {
    let controller: CreateSafraController
    let createSafraService: jest.Mocked<ICreateSafra>

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [CreateSafraController],
        providers: [
          {
            provide: ICreateSafra,
            useValue: {
              create: jest.fn(() => mockSafra()),
            },
          },
        ],
      }).compile()

      controller = module.get<CreateSafraController>(CreateSafraController)
      createSafraService = module.get<jest.Mocked<ICreateSafra>>(ICreateSafra)
    })

    it('should call service with right params', async () => {
      const body = mockBody()

      await controller.handle(body)

      expect(createSafraService.create).toHaveBeenCalledWith({
        propertyId: body.propertyId,
        name: body.name,
      })
    })

    it('should return SafraDto on success', async () => {
      const body = mockBody()
      const safra = mockSafra()
      createSafraService.create.mockResolvedValueOnce(safra)

      const result = await controller.handle(body)

      expect(result).toStrictEqual(SafraMapper.toDto(safra))
    })
  })
})
