import type { UpdateProducerBodyDto } from '#presentation/controllers/producer/update-producer.controller.js'
import { createMockParams, mockProducer } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

const mockBody = createMockParams<UpdateProducerBodyDto>(() => ({
  producerId: '704c84f2-1111-4587-9abc-b03b30f32d87',
  firstName: 'Maria',
  lastName: 'Doe',
  email: 'maria.doe@example.com',
  document: '67.567.234/0001-96',
}))

describe('UpdateProducer (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 400 Bad Request if body is invalid', async () => {
    const response = await sut.put(`/producer`).send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'BadRequest',
      message: {
        document: 'Campo obrigatório',
        email: 'Campo obrigatório',
        firstName: 'Campo obrigatório',
        lastName: 'Campo obrigatório',
        producerId: 'Campo obrigatório',
      },
    })
  })

  it('should return 200 if producer is updated', async () => {
    const producer = await setupEntity(sut, mockProducer())
    const body = mockBody({ producerId: producer.id })

    const response = await sut.put(`/producer`).send(body)

    expect(response.statusCode).toBe(200)
    await expect(
      sut.db.producer.findFirst({
        where: {
          firstName: body.firstName,
        },
      })
    ).resolves.toBeDefined()
  })
})
