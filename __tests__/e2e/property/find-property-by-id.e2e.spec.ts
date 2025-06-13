import { PropertyMapper } from '#presentation/mappers/property.mapper.js'
import { mockProducer, mockProperty } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

describe('FindPropertyById (e2e)', () => {
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
    const response = await sut.get(`/properties/invalid-uuid`).send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed (uuid is expected)',
    })
  })

  it('should return 404 if property is invalid', async () => {
    const response = await sut
      .get(`/properties/999b1ff2-e8df-4392-bbef-eb052412d404`)
      .send({})

    expect(response.body).toStrictEqual({
      statusCode: 404,
      error: 'Not Found',
      message: 'Propriedade não encontrada',
    })
  })

  it('should return 200 on success', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const property = await setupEntity(
      sut,
      mockProperty({ producerId: producer.id })
    )

    const response = await sut.get(`/properties/${property.id}`).send()

    expect(response.body).toStrictEqual(PropertyMapper.toDto(property))
    expect(response.statusCode).toBe(200)
  })
})
