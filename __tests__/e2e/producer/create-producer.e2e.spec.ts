import type { CreateProducerBodyDto } from '#presentation/controllers/producer/create-producer.controller.js'
import { createMockParams, mockProducer } from '#tests/helpers/mock-domain.js'
import { setupEntity, setupIntegrationTest } from '#tests/helpers/setup-test.js'
import type { IntegrationTestSut } from '#tests/helpers/setup-test.js'

const mockBody = createMockParams<CreateProducerBodyDto>(() => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  document: '67.567.234/0001-96',
}))

describe('CreateProducer (e2e)', () => {
  let sut: IntegrationTestSut

  beforeAll(async () => {
    sut = await setupIntegrationTest()
  })

  afterAll(async () => {
    await sut.db.producer.deleteMany()
    await sut.close()
  })

  it('should return 400 Bad Request if body is invalid', async () => {
    const response = await sut.post('/producer').send({})

    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: 'BadRequest',
      message: {
        document: 'Campo obrigatório',
        email: 'Campo obrigatório',
        firstName: 'Campo obrigatório',
        lastName: 'Campo obrigatório',
      },
    })
  })

  it('should return 201 if producer is created', async () => {
    const body = mockBody()

    const response = await sut.post('/producer').send(body)

    expect(response.statusCode).toBe(201)
    await expect(
      sut.db.producer.findFirst({
        where: {
          firstName: body.firstName,
        },
      })
    ).resolves.toBeDefined()
  })

  it('should return 400 if producer is already created', async () => {
    const producer = await setupEntity(sut, mockProducer({ random: true }))
    const body = mockBody({ email: producer.email })

    const response = await sut.post('/producer').send(body)

    expect(response.body).toStrictEqual({
      error: 'Bad Request',
      message: 'Produtor já cadastrado',
      statusCode: 400,
    })
  })
})
