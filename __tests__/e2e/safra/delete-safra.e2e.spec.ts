import {
  mockProducer,
  mockProperty,
  mockSafra,
} from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('DeleteSafra (e2e)', () => {
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

  it('should return 400 if uuid is invalid', async () => {
    const response = await sut.delete(`/safras/invalid-uuid`).send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed (uuid is expected)',
    })
  })

  it('should return 404 if safra is invalid', async () => {
    const response = await sut
      .delete(`/safras/999b1ff2-e8df-4392-bbef-eb052412d404`)
      .send({})

    expect(response.body).toStrictEqual({
      error: 'Not Found',
      message: 'Safra não encontrada',
      statusCode: 404,
    })
  })

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const property = await setupEntity(
      sut,
      mockProperty({ producerId: producer.id })
    )
    const safra = await setupEntity(sut, mockSafra({ propertyId: property.id }))

    const response = await sut.delete(`/safras/${safra.id}`).send()

    expect(response.body).toStrictEqual({})
    expect(response.statusCode).toBe(200)
    await expect(
      sut.db.safra.findFirst({
        where: {
          id: safra.id,
          deletedAt: null,
        },
      })
    ).resolves.toBeNull()
  })
})
