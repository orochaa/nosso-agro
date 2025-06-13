/* eslint-disable jest/max-expects */
import { Property } from '#domain/entities/property.js'
import { mockProperty } from '#tests/helpers/mock-domain.js'
import { BadRequestException } from '@nestjs/common'

describe('Property', () => {
  it('should create a valid Property instance', () => {
    const validParams: Property.Params = {
      id: '704c84f2-1111-4587-9abc-b03b30f32d87',
      producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
      name: 'Fazenda Feliz',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 1000,
      vegetationArea: 500,
      arableArea: 500,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const property = new Property(validParams)

    expect(property.id).toBe(validParams.id)
    expect(property.producerId).toBe(validParams.producerId)
    expect(property.name).toBe(validParams.name)
    expect(property.city).toBe(validParams.city)
    expect(property.state).toBe(validParams.state)
    expect(property.totalArea).toBe(validParams.totalArea)
    expect(property.vegetationArea).toBe(validParams.vegetationArea)
    expect(property.arableArea).toBe(validParams.arableArea)
    expect(property.createdAt.toISOString()).toBe(validParams.createdAt)
    expect(property.updatedAt.toISOString()).toBe(validParams.updatedAt)
  })

  it('should throw if params are invalid', () => {
    expect(() => mockProperty({ id: '' })).toThrow(BadRequestException)
    expect(() => mockProperty({ producerId: '' })).toThrow(BadRequestException)
    expect(() => mockProperty({ name: '' })).toThrow(BadRequestException)
    expect(() => mockProperty({ city: '' })).toThrow(BadRequestException)
    expect(() => mockProperty({ state: '' })).toThrow(BadRequestException)
    expect(() => mockProperty({ arableArea: 0 })).toThrow(BadRequestException)
    expect(() => mockProperty({ vegetationArea: 0 })).toThrow(
      BadRequestException
    )
    expect(() => mockProperty({ totalArea: 0 })).toThrow(BadRequestException)
    expect(() =>
      mockProperty({ totalArea: 1000, arableArea: 501, vegetationArea: 500 })
    ).toThrow(BadRequestException)
    expect(() => mockProperty({ createdAt: '' })).toThrow(BadRequestException)
    expect(() => mockProperty({ updatedAt: '' })).toThrow(BadRequestException)
  })

  it('should throw when setting invalid name', () => {
    const property = mockProperty()

    expect(() => (property.name = '')).toThrow(BadRequestException)
  })

  it('should allow setting valid name', () => {
    const property = mockProperty()
    property.name = 'São Paulo'

    expect(property.name).toBe('São Paulo')
  })

  it('should throw when setting invalid producerId', () => {
    const property = mockProperty()

    expect(() => (property.producerId = '')).toThrow(BadRequestException)
  })

  it('should allow setting valid producerId', () => {
    const property = mockProperty()
    property.producerId = '704c84f2-1111-4587-9abc-b03b30f32d88'

    expect(property.producerId).toBe('704c84f2-1111-4587-9abc-b03b30f32d88')
  })

  it('should throw when setting invalid city', () => {
    const property = mockProperty()

    expect(() => (property.city = '')).toThrow(BadRequestException)
  })

  it('should allow setting valid city', () => {
    const property = mockProperty()
    property.city = 'Rio de Janeiro'

    expect(property.city).toBe('Rio de Janeiro')
  })

  it('should throw when setting invalid state', () => {
    const property = mockProperty()

    expect(() => (property.state = '')).toThrow(BadRequestException)
  })

  it('should allow setting valid state', () => {
    const property = mockProperty()
    property.state = 'RJ'

    expect(property.state).toBe('RJ')
  })

  it('should throw when setting invalid totalArea', () => {
    const property = mockProperty()

    expect(() => (property.totalArea = 0)).toThrow(BadRequestException)
  })

  it('should allow setting valid totalArea', () => {
    const property = mockProperty()
    property.totalArea = 2000

    expect(property.totalArea).toBe(2000)
  })

  it('should throw when setting invalid arableArea', () => {
    const property = mockProperty()

    expect(() => (property.arableArea = 0)).toThrow(BadRequestException)
  })

  it('should allow setting valid arableArea', () => {
    const property = mockProperty()
    property.arableArea = 600

    expect(property.arableArea).toBe(600)
  })

  it('should throw when setting invalid vegetationArea', () => {
    const property = mockProperty()

    expect(() => (property.vegetationArea = 0)).toThrow(BadRequestException)
  })

  it('should allow setting valid vegetationArea', () => {
    const property = mockProperty()
    property.vegetationArea = 600

    expect(property.vegetationArea).toBe(600)
  })

  describe('Static Methods', () => {
    it('should create a property with valid params', () => {
      const params: Property.CreateParams = {
        producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
        name: 'Fazenda Feliz',
        city: 'São Paulo',
        state: 'SP',
        totalArea: 1000,
        vegetationArea: 500,
        arableArea: 500,
      }
      const property = Property.create(params)

      expect(property.id).toBeDefined()
      expect(property.producerId).toBe(params.producerId)
      expect(property.name).toBe(params.name)
      expect(property.city).toBe(params.city)
      expect(property.state).toBe(params.state)
      expect(property.totalArea).toBe(params.totalArea)
      expect(property.vegetationArea).toBe(params.vegetationArea)
      expect(property.arableArea).toBe(params.arableArea)
      expect(property.createdAt).toBeDefined()
      expect(property.updatedAt).toBeDefined()
    })
  })
})
