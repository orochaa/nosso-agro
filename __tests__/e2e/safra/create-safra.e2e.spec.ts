import type { CreateSafraBodyDto } from '#presentation/controllers/safra/create-safra.controller.js'
import {
  createMockParams,
  mockProducer,
  mockProperty,
} from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

const mockBody = createMockParams<CreateSafraBodyDto>(() => ({
  propertyId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: '2021',
}))

describe('CreateSafra (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.safra.deleteMany()
    await sut.db.property.deleteMany()
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 400 Bad Request if body is invalid', async () => {
    const response = await sut.post('/safra').send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'BadRequest',
      message: {
        propertyId: 'Campo obrigatório',
        name: 'Campo obrigatório',
      },
    })
  })

  it('should return 201 if safra is created', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const property = await setupEntity(
      sut,
      mockProperty({ producerId: producer.id })
    )
    const body = mockBody({ propertyId: property.id })

    const response = await sut.post('/safra').send(body)

    expect(response.statusCode).toBe(201)
    await expect(
      sut.db.safra.findFirst({
        where: {
          name: body.name,
        },
      })
    ).resolves.toBeDefined()
  })
})
