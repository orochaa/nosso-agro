import { Plantation } from '#domain/entities/plantation.js'
import { Producer } from '#domain/entities/producer.js'
import { Property } from '#domain/entities/property.js'
import { Safra } from '#domain/entities/safra.js'
import { PlantationMapper } from '#infra/database/postgres/mappers/plantation.mapper.js'
import { ProducerMapper } from '#infra/database/postgres/mappers/producer.mapper.js'
import { PropertyMapper } from '#infra/database/postgres/mappers/property.mapper.js'
import { SafraMapper } from '#infra/database/postgres/mappers/safra.mapper.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { HttpExceptionsFilter } from '#main/http-exceptions.filter.js'
import { AppModule } from '#main/modules/app.module.js'
import { ValidationPipe, mapError } from '#main/validation.pipe.js'
import type { INestApplication } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { validate as validateClass } from 'class-validator'
import supertest from 'supertest'
import type http from 'node:http'

export async function validate(obj: object): Promise<Record<string, unknown>> {
  const errors = await validateClass(obj)
  const errorResponse: Record<string, unknown> = {}

  for (const error of errors) {
    mapError(errorResponse, error)
  }

  return errorResponse
}

export interface IntegrationTestSut extends supertest.Agent {
  app: INestApplication
  db: PrismaService
  close(): Promise<void>
}

export async function setupIntegrationTest(): Promise<IntegrationTestSut> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new HttpExceptionsFilter(httpAdapter))
  app.useGlobalPipes(new ValidationPipe())

  await app.init()

  const db = app.get(PrismaService)
  const request = supertest(app.getHttpServer() as http.Server)

  const close = async (): Promise<void> => {
    await app.close()
    await db.$disconnect()
  }

  Object.assign(request, {
    app,
    db,
    close,
  })

  return request as IntegrationTestSut
}

export async function setupEntity<TEntity>(
  sut: IntegrationTestSut,
  entity: TEntity
): Promise<TEntity> {
  const map: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    Function,
    Exclude<keyof PrismaService, `${'$' | 'on'}${string}` | symbol>,
    { toPrisma(entity: any): any },
  ][] = [
    [Producer, 'producer', ProducerMapper],
    [Property, 'property', PropertyMapper],
    [Safra, 'safra', SafraMapper],
    [Plantation, 'plantation', PlantationMapper],
  ]

  for (const [EntityClass, table, mapper] of map) {
    if (entity instanceof EntityClass) {
      // @ts-expect-error
      await sut.db[table].create({
        data: mapper.toPrisma(entity),
      })

      return entity
    }
  }

  throw new Error('Unsupported entity')
}
