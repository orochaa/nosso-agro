import { mockProducer } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('DeleteProducer (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 400 if uuid is invalid', async () => {
    const response = await sut.delete(`/producers/invalid-uuid`).send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed (uuid is expected)',
    })
  })

  it('should return 404 if producer is invalid', async () => {
    const response = await sut
      .delete(`/producers/999b1ff2-e8df-4392-bbef-eb052412d404`)
      .send({})

    expect(response.body).toStrictEqual({
      error: 'Not Found',
      message: 'Produtor não encontrado',
      statusCode: 404,
    })
  })

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut, mockProducer())

    const response = await sut.delete(`/producers/${producer.id}`).send()

    expect(response.body).toStrictEqual({})
    expect(response.statusCode).toBe(200)
    await expect(
      sut.db.producer.findFirst({
        where: {
          id: producer.id,
          deletedAt: null,
        },
      })
    ).resolves.toBeNull()
  })
})
