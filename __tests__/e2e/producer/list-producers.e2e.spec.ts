import { ProducerMapper } from '#presentation/mappers/producer.mapper.js'
import { mockProducer } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('ListProducers (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut, mockProducer())

    const response = await sut.get('/producers').send()

    expect(response.body).toStrictEqual(
      ProducerMapper.mapToSampleDto([producer])
    )
    expect(response.statusCode).toBe(200)
  })
})
