import { SafraMapper } from '#presentation/mappers/safra.mapper.js'
import { mockProducer, mockProperty, mockSafra } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('ListSafrasByPropertyId (e2e)', () => {
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

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut,mockProducer())
    const property = await setupEntity(
      sut,
      mockProperty({ producerId: producer.id })
    )
    const safra = await setupEntity(sut, mockSafra({propertyId:property.id}))

    const response = await sut.get(`/properties/${producer.id}/safras`).send()

    expect(response.body).toStrictEqual(
      SafraMapper.mapToSampleDto([safra])
    )
    expect(response.statusCode).toBe(200)
  })
})
