import type { UpdateSafraBodyDto } from '#presentation/controllers/safra/update-safra.controller.js'
import {
  createMockParams,
  mockProducer,
  mockProperty,
  mockSafra,
} from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

const mockBody = createMockParams<UpdateSafraBodyDto>(() => ({
  safraId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  name: '2022',
}))

describe('UpdateSafra (e2e)', () => {
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
    const response = await sut.put(`/safra`).send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'BadRequest',
      message: {
        safraId: 'Campo obrigatório',
        name: 'Campo obrigatório',
      },
    })
  })

  it('should return 200 if safra is updated', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const property = await setupEntity(
      sut,
      mockProperty({ producerId: producer.id })
    )
    const safra = await setupEntity(sut, mockSafra({ propertyId: property.id }))
    const body = mockBody({ safraId: safra.id })

    const response = await sut.put(`/safra`).send(body)

    expect(response.statusCode).toBe(200)
    await expect(
      sut.db.safra.findFirst({
        where: {
          name: body.name,
        },
      })
    ).resolves.toBeDefined()
  })
})
