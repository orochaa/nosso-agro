import { PropertyMapper } from '#presentation/mappers/property.mapper.js'
import { mockProducer, mockProperty } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('ListPropertiesByProducerId (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.property.deleteMany()
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const property = await setupEntity(
      sut,
      mockProperty({ producerId: producer.id })
    )

    const response = await sut
      .get(`/producers/${producer.id}/properties`)
      .send()

    expect(response.body).toStrictEqual(
      PropertyMapper.mapToSampleDto([property])
    )
    expect(response.statusCode).toBe(200)
  })
})
