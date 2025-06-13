import { mockProducer, mockProperty } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('DeleteProperty (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.property.deleteMany()
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 400 if uuid is invalid', async () => {
    const response = await sut.delete(`/properties/invalid-uuid`).send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed (uuid is expected)',
    })
  })

  it('should return 404 if property is invalid', async () => {
    const response = await sut
      .delete(`/properties/999b1ff2-e8df-4392-bbef-eb052412d404`)
      .send({})

    expect(response.body).toStrictEqual({
      error: 'Not Found',
      message: 'Propriedade não encontrada',
      statusCode: 404,
    })
  })

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const property = await setupEntity(
      sut,
      mockProperty({ producerId: producer.id })
    )

    const response = await sut.delete(`/properties/${property.id}`).send()

    expect(response.body).toStrictEqual({})
    expect(response.statusCode).toBe(200)
    await expect(
      sut.db.property.findFirst({
        where: {
          id: property.id,
          deletedAt: null,
        },
      })
    ).resolves.toBeNull()
  })
})
