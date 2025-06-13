/* eslint-disable jest/max-expects */
import { Producer } from '#domain/entities/producer.js'
import { mockProducer } from '#tests/helpers/mock-domain.js'
import { BadRequestException } from '@nestjs/common'

describe('Producer', () => {
  it('should create a valid Producer instance', () => {
    const validParams: Producer.Params = {
      id: '704c84f2-1111-4587-9abc-b03b30f32d87',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      passwordHash: 'password-hash',
      document: '67.567.234/0001-96',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const producer = new Producer(validParams)

    expect(producer.id).toBe(validParams.id)
    expect(producer.firstName).toBe(validParams.firstName)
    expect(producer.lastName).toBe(validParams.lastName)
    expect(producer.email).toBe(validParams.email)
    expect(producer.createdAt.toISOString()).toBe(validParams.createdAt)
    expect(producer.updatedAt.toISOString()).toBe(validParams.updatedAt)
  })

  it('should throw if params are invalid', () => {
    expect(() => mockProducer({ id: '' })).toThrow(BadRequestException)
    expect(() => mockProducer({ firstName: '' })).toThrow(BadRequestException)
    expect(() => mockProducer({ firstName: 'John Doe' })).toThrow(
      BadRequestException
    )
    expect(() => mockProducer({ lastName: '' })).toThrow(BadRequestException)
    expect(() => mockProducer({ email: '' })).toThrow(BadRequestException)
    expect(() => mockProducer({ email: 'invalid_email' })).toThrow(
      BadRequestException
    )
    expect(() => mockProducer({ passwordHash: '' })).toThrow(
      BadRequestException
    )
    expect(() => mockProducer({ document: '' })).toThrow(BadRequestException)
    expect(() => mockProducer({ document: '12345678912' })).toThrow(
      BadRequestException
    )
    expect(() => mockProducer({ document: '12345678912/1234' })).toThrow(
      BadRequestException
    )
    expect(() => mockProducer({ createdAt: '' })).toThrow(BadRequestException)
    expect(() => mockProducer({ updatedAt: '' })).toThrow(BadRequestException)
  })

  it('should throw when setting invalid firstName', () => {
    const producer = mockProducer()

    expect(() => (producer.firstName = '')).toThrow(BadRequestException)
    expect(() => (producer.firstName = 'Joe Doe')).toThrow(BadRequestException)
  })

  it('should allow setting valid firstName', () => {
    const producer = mockProducer()
    producer.firstName = 'Jane'

    expect(producer.firstName).toBe('Jane')
  })

  it('should throw when setting invalid lastName', () => {
    const producer = mockProducer()

    expect(() => (producer.lastName = '')).toThrow(BadRequestException)
  })

  it('should allow setting valid lastName', () => {
    const producer = mockProducer()
    producer.lastName = 'Doe'

    expect(producer.lastName).toBe('Doe')
  })

  it('should throw when setting invalid email', () => {
    const producer = mockProducer()

    expect(() => (producer.email = '')).toThrow(BadRequestException)
    expect(() => (producer.email = 'invalid-email')).toThrow(
      BadRequestException
    )
  })

  it('should allow setting valid email', () => {
    const producer = mockProducer()
    producer.email = 'valid@gmail.com'

    expect(producer.email).toBe('valid@gmail.com')
  })

  it('should throw when setting invalid passwordHash', () => {
    const producer = mockProducer()

    expect(() => (producer.passwordHash = '')).toThrow(BadRequestException)
  })

  it('should allow setting valid passwordHash', () => {
    const producer = mockProducer()
    producer.passwordHash = 'new-hash'

    expect(producer.passwordHash).toBe('new-hash')
  })

  it('should throw when setting invalid document', () => {
    const producer = mockProducer()

    expect(() => (producer.document = '')).toThrow(BadRequestException)
    expect(() => (producer.document = '12345678912')).toThrow(
      BadRequestException
    )
    expect(() => (producer.document = '12345678912/1234')).toThrow(
      BadRequestException
    )
  })

  it('should allow setting valid document', () => {
    const producer = mockProducer()
    producer.document = '67.567.234/0001-96'

    expect(producer.document).toBe('67.567.234/0001-96')
  })

  it('should return fullName', () => {
    const producer = mockProducer()

    expect(producer.fullName).toBe(`${producer.firstName} ${producer.lastName}`)
  })

  describe('Static Methods', () => {
    it('should create a random password', () => {
      expect(Producer.generateRandomPassword(12)).toHaveLength(12)
    })

    it('should create a producer with valid params', () => {
      const params: Producer.CreateParams = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        passwordHash: 'passwordHash-hash',
        document: '67.567.234/0001-96',
      }
      const producer = Producer.create(params)

      expect(producer.id).toBeDefined()
      expect(producer.firstName).toBe(params.firstName)
      expect(producer.lastName).toBe(params.lastName)
      expect(producer.email).toBe(params.email)
      expect(producer.document).toBe(params.document)
      expect(producer.createdAt).toBeDefined()
      expect(producer.updatedAt).toBeDefined()
    })
  })
})
