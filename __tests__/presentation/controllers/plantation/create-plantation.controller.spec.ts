import { ICreatePlantation } from '#domain/usecases/plantation/create-plantation.js'
import {
  CreatePlantationBodyDto,
  CreatePlantationController,
} from '#presentation/controllers/plantation/create-plantation.controller.js'
import { PlantationMapper } from '#presentation/mappers/plantation.mapper.js'
import { createMockParams, mockPlantation } from '#tests/helpers/mock-domain.js'
import { validate } from '#tests/helpers/setup-test.js'
import { Test } from '@nestjs/testing'

const mockBody = createMockParams<CreatePlantationBodyDto>(() => ({
  safraId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Soja',
}))

describe('CratePlantationController', () => {
  describe('Body Validation', () => {
    it('should fail if missing inputs', async () => {
      const body = new CreatePlantationBodyDto()

      const errors = await validate(body)

      expect(errors).toStrictEqual({
        safraId: 'Campo obrigatório',
        name: 'Campo obrigatório',
      })
    })

    it('should pass validation with correct inputs', async () => {
      const body = new CreatePlantationBodyDto()
      body.safraId = '704c84f2-1111-4587-9abc-b03b30f32d87'
      body.name = 'Soja'

      const errors = await validate(body)

      expect(errors).toStrictEqual({})
    })
  })

  describe('Handler', () => {
    let controller: CreatePlantationController
    let createPlantationService: jest.Mocked<ICreatePlantation>

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [CreatePlantationController],
        providers: [
          {
            provide: ICreatePlantation,
            useValue: {
              create: jest.fn(() => mockPlantation()),
            },
          },
        ],
      }).compile()

      controller = module.get<CreatePlantationController>(
        CreatePlantationController
      )
      createPlantationService =
        module.get<jest.Mocked<ICreatePlantation>>(ICreatePlantation)
    })

    it('should call service with right params', async () => {
      const body = mockBody()

      await controller.handle(body)

      expect(createPlantationService.create).toHaveBeenCalledWith({
        safraId: body.safraId,
        name: body.name,
      })
    })

    it('should return PlantationDto on success', async () => {
      const body = mockBody()
      const plantation = mockPlantation()
      createPlantationService.create.mockResolvedValueOnce(plantation)

      const result = await controller.handle(body)

      expect(result).toStrictEqual(PlantationMapper.toDto(plantation))
    })
  })
})
