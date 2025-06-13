import { SafraMapper } from '#presentation/mappers/safra.mapper.js'
import {
  mockProducer,
  mockProperty,
  mockSafra,
} from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('FindSafraById (e2e)', () => {
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
    const response = await sut.get(`/safras/invalid-uuid`).send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed (uuid is expected)',
    })
  })

  it('should return 404 if safra is invalid', async () => {
    const response = await sut
      .get(`/safras/999b1ff2-e8df-4392-bbef-eb052412d404`)
      .send({})

    expect(response.body).toStrictEqual({
      statusCode: 404,
      error: 'Not Found',
      message: 'Safra não encontrada',
    })
  })

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const property = await setupEntity(
      sut,
      mockProperty({ producerId: producer.id })
    )
    const safra = await setupEntity(sut, mockSafra({ propertyId: property.id }))

    const response = await sut.get(`/safras/${safra.id}`).send()

    expect(response.body).toStrictEqual(SafraMapper.toDto(safra))
    expect(response.statusCode).toBe(200)
  })
})
