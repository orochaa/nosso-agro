import { ProducerMapper } from '#presentation/mappers/producer.mapper.js'
import { mockProducer } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('FindProducerById (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 400 if uuid is invalid', async () => {
    const response = await sut.get(`/producers/invalid-uuid`).send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed (uuid is expected)',
    })
  })

  it('should return 404 if producer is invalid', async () => {
    const response = await sut
      .get(`/producers/999b1ff2-e8df-4392-bbef-eb052412d404`)
      .send({})

    expect(response.body).toStrictEqual({
      statusCode: 404,
      error: 'Not Found',
      message: 'Produtor não encontrado',
    })
  })

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut, mockProducer())

    const response = await sut.get(`/producers/${producer.id}`).send()

    expect(response.body).toStrictEqual(ProducerMapper.toDto(producer))
    expect(response.statusCode).toBe(200)
  })
})
