import { Safra } from '#domain/entities/safra.js'
import { mockSafra } from '#tests/helpers/mock-domain.js'
import { BadRequestException } from '@nestjs/common'

describe('Safra', () => {
  it('should create a valid Safra instance', () => {
    const validParams: Safra.Params = {
      id: '704c84f2-1111-4587-9abc-b03b30f32d87',
      propertyId: '704c84f2-1111-4587-9abc-b03b30f32d87',
      name: 'Soja',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const safra = new Safra(validParams)

    expect(safra.id).toBe(validParams.id)
    expect(safra.propertyId).toBe(validParams.propertyId)
    expect(safra.name).toBe(validParams.name)
    expect(safra.createdAt.toISOString()).toBe(validParams.createdAt)
    expect(safra.updatedAt.toISOString()).toBe(validParams.updatedAt)
  })

  it('should throw if params are invalid', () => {
    expect(() => mockSafra({ id: '' })).toThrow(BadRequestException)
    expect(() => mockSafra({ propertyId: '' })).toThrow(BadRequestException)
    expect(() => mockSafra({ name: '' })).toThrow(BadRequestException)
    expect(() => mockSafra({ createdAt: '' })).toThrow(BadRequestException)
    expect(() => mockSafra({ updatedAt: '' })).toThrow(BadRequestException)
  })

  it('should throw when setting invalid name', () => {
    const safra = mockSafra()

    expect(() => (safra.name = '')).toThrow(BadRequestException)
  })

  it('should allow setting valid name', () => {
    const safra = mockSafra()
    safra.name = 'São Paulo'

    expect(safra.name).toBe('São Paulo')
  })

  describe('Static Methods', () => {
    it('should create a safra with valid params', () => {
      const params: Safra.CreateParams = {
        propertyId: '704c84f2-1111-4587-9abc-b03b30f32d87',
        name: 'Soja',
      }
      const safra = Safra.create(params)

      expect(safra.id).toBeDefined()
      expect(safra.propertyId).toBe(params.propertyId)
      expect(safra.name).toBe(params.name)
      expect(safra.createdAt).toBeDefined()
      expect(safra.updatedAt).toBeDefined()
    })
  })
})
