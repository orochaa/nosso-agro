import {
  IDeleteProducerRepository,
  IFindProducerByIdRepository,
} from '#services/protocols/database/producer-repository.js'
import { DeleteProducer } from '#services/usecases/producer/delete-producer.service.js'
import { mockProducer } from '#tests/helpers/mock-domain.js'
import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

describe('DeleteProducer', () => {
  let updateProducer: DeleteProducer
  let findProducerByIdRepository: jest.Mocked<IFindProducerByIdRepository>
  let deleteProducerRepository: jest.Mocked<IDeleteProducerRepository>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteProducer,
        {
          provide: IFindProducerByIdRepository,
          useValue: {
            findById: jest.fn(() => mockProducer()),
          },
        },
        {
          provide: IDeleteProducerRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    updateProducer = module.get<DeleteProducer>(DeleteProducer)
    findProducerByIdRepository = module.get<
      jest.Mocked<IFindProducerByIdRepository>
    >(IFindProducerByIdRepository)
    deleteProducerRepository = module.get<
      jest.Mocked<IDeleteProducerRepository>
    >(IDeleteProducerRepository)
  })

  it('should throw NotFoundException if producer does not exist', async () => {
    findProducerByIdRepository.findById.mockResolvedValueOnce(null)

    const promise = updateProducer.delete('any-producer-id')

    await expect(promise).rejects.toThrow(
      new NotFoundException('Produtor não encontrado')
    )
    expect(findProducerByIdRepository.findById).toHaveBeenCalledWith(
      'any-producer-id'
    )
  })

  it('should delete producer on success', async () => {
    const producer = mockProducer()
    findProducerByIdRepository.findById.mockResolvedValueOnce(producer)

    const promise = updateProducer.delete('any-producer-id')

    await expect(promise).resolves.toBeUndefined()
    expect(deleteProducerRepository.delete).toHaveBeenCalledWith(producer)
  })
})
