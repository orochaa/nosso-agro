import { IUpdateSafra } from '#domain/usecases/safra/update-safra.js'
import {
  UpdateSafraBodyDto,
  UpdateSafraController,
} from '#presentation/controllers/safra/update-safra.controller.js'
import { SafraMapper } from '#presentation/mappers/safra.mapper.js'
import { createMockParams, mockSafra } from '#tests/helpers/mock-domain.js'
import { validate } from '#tests/helpers/setup-test.js'
import { Test } from '@nestjs/testing'

const mockBody = createMockParams<UpdateSafraBodyDto>(() => ({
  safraId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: '2021',
}))

describe('CrateSafraController', () => {
  describe('Body Validation', () => {
    it('should fail if missing inputs', async () => {
      const body = new UpdateSafraBodyDto()

      const errors = await validate(body)

      expect(errors).toStrictEqual({
        safraId: 'Campo obrigatório',
        name: 'Campo obrigatório',
      })
    })

    it('should pass validation with correct inputs', async () => {
      const body = new UpdateSafraBodyDto()
      body.safraId = '704c84f2-1111-4587-9abc-b03b30f32d87'
      body.name = '2022'

      const errors = await validate(body)

      expect(errors).toStrictEqual({})
    })
  })

  describe('Handler', () => {
    let controller: UpdateSafraController
    let updateSafraService: jest.Mocked<IUpdateSafra>

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [UpdateSafraController],
        providers: [
          {
            provide: IUpdateSafra,
            useValue: {
              update: jest.fn(() => mockSafra()),
            },
          },
        ],
      }).compile()

      controller = module.get<UpdateSafraController>(UpdateSafraController)
      updateSafraService = module.get<jest.Mocked<IUpdateSafra>>(IUpdateSafra)
    })

    it('should call service with right params', async () => {
      const body = mockBody()

      await controller.handle(body)

      expect(updateSafraService.update).toHaveBeenCalledWith({
        safraId: body.safraId,
        name: body.name,
      })
    })

    it('should return SafraDto on success', async () => {
      const body = mockBody()
      const safra = mockSafra()
      updateSafraService.update.mockResolvedValueOnce(safra)

      const result = await controller.handle(body)

      expect(result).toStrictEqual(SafraMapper.toDto(safra))
    })
  })
})
