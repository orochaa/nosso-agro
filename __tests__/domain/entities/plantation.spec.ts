import { Plantation } from '#domain/entities/plantation.js'
import { mockPlantation } from '#tests/helpers/mock-domain.js'
import { BadRequestException } from '@nestjs/common'

describe('Plantation', () => {
  it('should create a valid Plantation instance', () => {
    const validParams: Plantation.Params = {
      id: '704c84f2-1111-4587-9abc-b03b30f32d87',
      safraId: '704c84f2-1111-4587-9abc-b03b30f32d87',
      name: 'Soja',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const plantation = new Plantation(validParams)

    expect(plantation.id).toBe(validParams.id)
    expect(plantation.safraId).toBe(validParams.safraId)
    expect(plantation.name).toBe(validParams.name)
    expect(plantation.createdAt.toISOString()).toBe(validParams.createdAt)
    expect(plantation.updatedAt.toISOString()).toBe(validParams.updatedAt)
  })

  it('should throw if params are invalid', () => {
    expect(() => mockPlantation({ id: '' })).toThrow(BadRequestException)
    expect(() => mockPlantation({ safraId: '' })).toThrow(BadRequestException)
    expect(() => mockPlantation({ name: '' })).toThrow(BadRequestException)
    expect(() => mockPlantation({ createdAt: '' })).toThrow(BadRequestException)
    expect(() => mockPlantation({ updatedAt: '' })).toThrow(BadRequestException)
  })

  it('should throw when setting invalid name', () => {
    const plantation = mockPlantation()

    expect(() => (plantation.name = '')).toThrow(BadRequestException)
  })

  it('should allow setting valid name', () => {
    const plantation = mockPlantation()
    plantation.name = 'São Paulo'

    expect(plantation.name).toBe('São Paulo')
  })

  describe('Static Methods', () => {
    it('should create a plantation with valid params', () => {
      const params: Plantation.CreateParams = {
        safraId: '704c84f2-1111-4587-9abc-b03b30f32d87',
        name: 'Soja',
      }
      const plantation = Plantation.create(params)

      expect(plantation.id).toBeDefined()
      expect(plantation.safraId).toBe(params.safraId)
      expect(plantation.name).toBe(params.name)
      expect(plantation.createdAt).toBeDefined()
      expect(plantation.updatedAt).toBeDefined()
    })
  })
})
