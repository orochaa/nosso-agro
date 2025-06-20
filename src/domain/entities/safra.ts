import { BadRequestException } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

export class Safra {
  private readonly props: Safra.Props

  constructor(params: Safra.Params) {
    Safra.validateParams(params)

    this.props = {
      id: params.id,
      propertyId: params.propertyId,
      name: params.name,
      createdAt: new Date(params.createdAt),
      updatedAt: new Date(params.updatedAt),
    }
  }

  private static validateParams(params: Safra.Params): void {
    if (!params.id) {
      throw new BadRequestException('Campo id é obrigatório')
    }

    if (!params.propertyId) {
      throw new BadRequestException('Campo propertyId é obrigatório')
    }

    if (!params.name) {
      throw new BadRequestException('Campo nome é obrigatório')
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

  get propertyId(): string {
    return this.props.propertyId
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    if (!name) {
      throw new BadRequestException('Campo nome é obrigatório')
    }
    this.props.name = name
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

  static create(params: Safra.CreateParams): Safra {
    return new Safra({
      id: randomUUID(),
      propertyId: params.propertyId,
      name: params.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}

export namespace Safra {
  export interface Props {
    id: string
    propertyId: string
    name: string
    createdAt: Date
    updatedAt: Date
  }

  export interface Params {
    id: string
    propertyId: string
    name: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export interface CreateParams {
    propertyId: string
    name: string
  }
}
