import { PlantationMapper } from '#presentation/mappers/plantation.mapper.js'
import {
  mockPlantation,
  mockProducer,
  mockProperty,
  mockSafra,
} from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('ListPlantationsBySafraId (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.plantation.deleteMany()
    await sut.db.safra.deleteMany()
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
    const safra = await setupEntity(sut, mockSafra({ propertyId: property.id }))
    const plantation = await setupEntity(
      sut,
      mockPlantation({ safraId: safra.id })
    )

    const response = await sut.get(`/safras/${safra.id}/plantations`).send()

    expect(response.body).toStrictEqual(
      PlantationMapper.mapToSampleDto([plantation])
    )
    expect(response.statusCode).toBe(200)
  })
})
