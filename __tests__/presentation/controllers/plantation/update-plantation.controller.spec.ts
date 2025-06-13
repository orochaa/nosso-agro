import { IUpdatePlantation } from '#domain/usecases/plantation/update-plantation.js'
import {
  UpdatePlantationBodyDto,
  UpdatePlantationController,
} from '#presentation/controllers/plantation/update-plantation.controller.js'
import { PlantationMapper } from '#presentation/mappers/plantation.mapper.js'
import { createMockParams, mockPlantation } from '#tests/helpers/mock-domain.js'
import { validate } from '#tests/helpers/setup-test.js'
import { Test } from '@nestjs/testing'

const mockBody = createMockParams<UpdatePlantationBodyDto>(() => ({
  plantationId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Soja',
}))

describe('CratePlantationController', () => {
  describe('Body Validation', () => {
    it('should fail if missing inputs', async () => {
      const body = new UpdatePlantationBodyDto()

      const errors = await validate(body)

      expect(errors).toStrictEqual({
        plantationId: 'Campo obrigatório',
        name: 'Campo obrigatório',
      })
    })

    it('should pass validation with correct inputs', async () => {
      const body = new UpdatePlantationBodyDto()
      body.plantationId = '704c84f2-1111-4587-9abc-b03b30f32d87'
      body.name = 'Soja'

      const errors = await validate(body)

      expect(errors).toStrictEqual({})
    })
  })

  describe('Handler', () => {
    let controller: UpdatePlantationController
    let updatePlantationService: jest.Mocked<IUpdatePlantation>

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [UpdatePlantationController],
        providers: [
          {
            provide: IUpdatePlantation,
            useValue: {
              update: jest.fn(() => mockPlantation()),
            },
          },
        ],
      }).compile()

      controller = module.get<UpdatePlantationController>(
        UpdatePlantationController
      )
      updatePlantationService =
        module.get<jest.Mocked<IUpdatePlantation>>(IUpdatePlantation)
    })

    it('should call service with right params', async () => {
      const body = mockBody()

      await controller.handle(body)

      expect(updatePlantationService.update).toHaveBeenCalledWith({
        plantationId: body.plantationId,
        name: body.name,
      })
    })

    it('should return PlantationDto on success', async () => {
      const body = mockBody()
      const plantation = mockPlantation()
      updatePlantationService.update.mockResolvedValueOnce(plantation)

      const result = await controller.handle(body)

      expect(result).toStrictEqual(PlantationMapper.toDto(plantation))
    })
  })
})
