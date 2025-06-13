import { Plantation } from '#domain/entities/plantation.js'
import { Producer } from '#domain/entities/producer.js'
import { Property } from '#domain/entities/property.js'
import { Safra } from '#domain/entities/safra.js'
import { randomUUID } from 'node:crypto'

function generateRandomEmail(): string {
  const randomString = Math.random().toString(36).slice(2, 15)

  return `${randomString}@example.com`
}

export function createMockParams<TParams extends Record<string, any>>(
  generateParams: () => TParams
) {
  return (overwrite?: Partial<TParams>): TParams => {
    const params = generateParams()

    if (overwrite) {
      return Object.assign(params, overwrite)
    }

    return params
  }
}

type EntityConstructor<TEntity = any> = new (params: any) => TEntity

type EntityParams<TEntityConstructor> = TEntityConstructor extends new (
  params: infer TParams
) => unknown
  ? TParams
  : never

type EntityInstance<TEntityConstructor> = TEntityConstructor extends new (
  params: any
) => infer TEntity
  ? TEntity
  : never

function createMockEntity<TEntityConstructor extends EntityConstructor>(
  Entity: TEntityConstructor,
  generateParams: () => EntityParams<TEntityConstructor>
) {
  return (
    overwrite?: Partial<EntityParams<TEntityConstructor>> & { random?: true }
  ): EntityInstance<TEntityConstructor> => {
    const params = generateParams()

    if (overwrite) {
      return new Entity(
        Object.assign(
          params,
          overwrite.random
            ? {
                id: randomUUID(),
                email: generateRandomEmail(),
              }
            : {},
          overwrite
        )
      )
    }

    return new Entity(params)
  }
}

export const mockProducer = createMockEntity(Producer, () => ({
  id: '704c84f2-1111-4587-9abc-b03b30f32d87',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  passwordHash: 'hashed_password',
  document: '67.567.234/0001-96',
  createdAt: new Date(),
  updatedAt: new Date(),
}))

export const mockProperty = createMockEntity(Property, () => ({
  id: '704c84f2-1111-4587-9abc-b03b30f32d87',
  producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Fazenda Feliz',
  city: 'São Paulo',
  state: 'SP',
  totalArea: 1000,
  vegetationArea: 500,
  arableArea: 500,
  createdAt: new Date(),
  updatedAt: new Date(),
}))

export const mockSafra = createMockEntity(Safra, () => ({
  id: '704c84f2-1111-4587-9abc-b03b30f32d87',
  propertyId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: '2021',
  createdAt: new Date(),
  updatedAt: new Date(),
}))

export const mockPlantation = createMockEntity(Plantation, () => ({
  id: '704c84f2-1111-4587-9abc-b03b30f32d87',
  safraId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Soja',
  createdAt: new Date(),
  updatedAt: new Date(),
}))
