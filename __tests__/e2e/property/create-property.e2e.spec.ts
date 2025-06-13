import type { CreatePropertyBodyDto } from '#presentation/controllers/property/create-property.controller.js'
import { createMockParams, mockProducer } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

const mockBody = createMockParams<CreatePropertyBodyDto>(() => ({
  producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: 'Fazenda Feliz',
  city: 'São Paulo',
  state: 'SP',
  totalArea: 1000,
  vegetationArea: 500,
  agriculturalArea: 500,
}))

describe('CreateProperty (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.property.deleteMany()
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 400 Bad Request if body is invalid', async () => {
    const response = await sut.post('/property').send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'BadRequest',
      message: {
        agriculturalArea: 'Campo obrigatório',
        city: 'Campo obrigatório',
        name: 'Campo obrigatório',
        producerId: 'Campo obrigatório',
        state: 'Campo obrigatório',
        totalArea: 'Campo obrigatório',
        vegetationArea: 'Campo obrigatório',
      },
    })
  })

  it('should return 201 if property is created', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const body = mockBody({ producerId: producer.id })

    const response = await sut.post('/property').send(body)

    expect(response.statusCode).toBe(201)
    await expect(
      sut.db.property.findFirst({
        where: {
          name: body.name,
        },
      })
    ).resolves.toBeDefined()
  })
})
