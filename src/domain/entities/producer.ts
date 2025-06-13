/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable security/detect-object-injection */
import { BadRequestException } from '@nestjs/common'
import {
  isValidCNPJ,
  isValidCPF,
  isValidEmail,
} from '@brazilian-utils/brazilian-utils'
import { randomUUID } from 'node:crypto'

export class Producer {
  private readonly props: Producer.Props

  constructor(params: Producer.Params) {
    Producer.validateParams(params)

    this.props = {
      id: params.id,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      document: params.document,
      passwordHash: params.passwordHash,
      createdAt: new Date(params.createdAt),
      updatedAt: new Date(params.updatedAt),
    }
  }

  private static validateParams(params: Producer.Params): void {
    if (!params.id) {
      throw new BadRequestException('Campo id é obrigatório')
    }

    if (!params.firstName) {
      throw new BadRequestException('Campo primeiro nome é obrigatório')
    }

    if (params.firstName.split(' ').length > 1) {
      throw new BadRequestException(
        'Campo primeiro nome deve ter apenas uma palavra'
      )
    }

    if (!params.lastName) {
      throw new BadRequestException('Campo último nome é obrigatório')
    }

    if (!params.email) {
      throw new BadRequestException('Campo email é obrigatório')
    }

    if (!isValidEmail(params.email)) {
      throw new BadRequestException('Email inválido')
    }

    if (!params.passwordHash) {
      throw new BadRequestException('Campo senha é obrigatório')
    }

    if (!params.document) {
      throw new BadRequestException('Campo documento é obrigatório')
    }

    if (!isValidCPF(params.document) && !isValidCNPJ(params.document)) {
      throw new BadRequestException('Documento deve ser um CPF ou CNPJ válido')
    }

    if (!params.createdAt) {
      throw new BadRequestException('Campo createdAt é obrigatório')
    }

    if (!params.updatedAt) {
      throw new BadRequestException('Campo updatedAt é obrigatório')
    }
  }

  get id(): string {
    return this.props.id
  }

  get firstName(): string {
    return this.props.firstName
  }

  set firstName(firstName: string) {
    if (!firstName) {
      throw new BadRequestException('Campo primeiro nome é obrigatório')
    }

    if (firstName.split(' ').length > 1) {
      throw new BadRequestException(
        'Campo primeiro nome deve ter apenas uma palavra'
      )
    }
    this.props.firstName = firstName
    this.update()
  }

  get lastName(): string {
    return this.props.lastName
  }

  set lastName(lastName: string) {
    if (!lastName) {
      throw new BadRequestException('Campo último nome é obrigatório')
    }
    this.props.lastName = lastName
    this.update()
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    if (!email) {
      throw new BadRequestException('Campo email é obrigatório')
    }

    if (!isValidEmail(email)) {
      throw new BadRequestException('Email inválido')
    }
    this.props.email = email
    this.update()
  }

  get passwordHash(): string {
    return this.props.passwordHash
  }

  set passwordHash(passwordHash: string) {
    if (!passwordHash) {
      throw new BadRequestException('Campo senha é obrigatório')
    }

    this.props.passwordHash = passwordHash
    this.update()
  }

  get document(): string {
    return this.props.document
  }

  set document(document: string) {
    if (!document) {
      throw new BadRequestException('Campo documento é obrigatório')
    }

    if (!isValidCPF(document) && !isValidCNPJ(document)) {
      throw new BadRequestException('Documento deve ser um CPF ou CNPJ válido')
    }
    this.props.document = document
    this.update()
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  private update(): void {
    this.props.updatedAt = new Date()
  }

  static generateRandomPassword(length: number): string {
    const specials = '!@#$%&_?.'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const all = specials + lowercase + uppercase + numbers

    const pick = (str: string, min: number, max?: number): string => {
      let chars: string = ''
      const n: number = max
        ? min + Math.floor(Math.random() * (max - min + 1))
        : min

      for (let i = 0; i < n; i++) {
        chars += str.charAt(Math.floor(Math.random() * str.length))
      }

      return chars
    }

    const shuffle = (str: string): string => {
      const array: string[] = [...str]
      let tmp: string
      let current: number
      let top: number = array.length

      if (top) {
        while (--top) {
          current = Math.floor(Math.random() * (top + 1))
          tmp = array[current]!
          array[current] = array[top]!
          array[top] = tmp
        }
      }

      return array.join('')
    }

    let passwordHash = ''

    while (passwordHash.length < length) {
      passwordHash += pick(specials, 1)
      passwordHash += pick(lowercase, 1)
      passwordHash += pick(uppercase, 1)
      passwordHash += pick(all, 3, 10)
    }

    return shuffle(passwordHash.slice(0, Math.max(0, length)))
  }

  static create(params: Producer.CreateParams): Producer {
    return new Producer({
      id: randomUUID(),
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      document: params.document,
      passwordHash: params.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}

export namespace Producer {
  export interface Props {
    id: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    document: string
    createdAt: Date
    updatedAt: Date
  }

  export interface Params {
    id: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    document: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export interface CreateParams {
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    document: string
  }
}
