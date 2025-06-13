import { Plantation } from '#domain/entities/plantation'
import { Producer } from '#domain/entities/producer'
import { Property } from '#domain/entities/property'
import { Safra } from '#domain/entities/safra'
import { PlantationMapper } from '#infra/database/postgres/mappers/plantation.mapper'
import { ProducerMapper } from '#infra/database/postgres/mappers/producer.mapper'
import { PropertyMapper } from '#infra/database/postgres/mappers/property.mapper'
import { SafraMapper } from '#infra/database/postgres/mappers/safra.mapper'
import { PrismaService } from '#infra/database/postgres/prisma.service'
import { HttpExceptionsFilter } from '#main/http-exceptions.filter'
import { AppModule } from '#main/modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import type { INestApplication } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { validate as validateClass } from 'class-validator'
import supertest from 'supertest'
import type http from 'node:http'

export async function validate(obj: object): Promise<string[]> {
  const errors = await validateClass(obj)
  const result: string[] = []

  for (const error of errors) {
    for (const [, value] of Object.entries(error.constraints ?? {})) {
      result.push(value)
      break
    }
  }

  return result
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

  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      stopAtFirstError: true,
    })
  )

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
