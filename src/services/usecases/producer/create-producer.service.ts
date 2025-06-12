import { Producer } from '#domain/entities/producer.js'
import { ICreateProducer } from '#domain/usecases/producer/create-producer.js'
import { IHashGenerator } from '#services/protocols/data/hasher.js'
import { ISendUserCredentials } from '#services/protocols/data/mailer.js'
import {
  ICreateProducerRepository,
  IFindProducerByEmailRepository,
} from '#services/protocols/database/producer-repository.js'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class CreateProducer implements ICreateProducer {
  constructor(
    readonly findProducerByEmailRepository: IFindProducerByEmailRepository,
    readonly createProducerRepository: ICreateProducerRepository,
    readonly hashGenerator: IHashGenerator,
    readonly sendUserCredentials: ISendUserCredentials
  ) {}

  async create(params: ICreateProducer.Params): Promise<Producer> {
    const isDuplicated = await this.findProducerByEmailRepository.findByEmail(
      params.email
    )

    if (isDuplicated) {
      throw new BadRequestException('Usuário já cadastrado')
    }

    const rawPassword = Producer.generateRandomPassword(12)
    const hashPassword = await this.hashGenerator.generate(rawPassword)

    const user = Producer.create({
      firstName: params.firstName,
      lastName: params.lastName,
      password: hashPassword,
      email: params.email,
      document: params.document,
    })
    await this.createProducerRepository.create(user)
    await this.sendUserCredentials.sendMail({
      email: user.email,
      firstName: user.firstName,
      password: rawPassword,
    })

    return user
  }
}
