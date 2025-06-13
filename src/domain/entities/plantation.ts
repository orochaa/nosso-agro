import { BadRequestException } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

export class Plantation {
  private readonly props: Plantation.Props

  constructor(params: Plantation.Params) {
    Plantation.validateParams(params)

    this.props = {
      id: params.id,
      safraId: params.safraId,
      name: params.name,
      createdAt: new Date(params.createdAt),
      updatedAt: new Date(params.updatedAt),
    }
  }

  private static validateParams(params: Plantation.Params): void {
    if (!params.id) {
      throw new BadRequestException('Campo id é obrigatório')
    }

    if (!params.safraId) {
      throw new BadRequestException('Campo safraId é obrigatório')
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

  get safraId(): string {
    return this.props.safraId
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

  static create(params: Plantation.CreateParams): Plantation {
    return new Plantation({
      id: randomUUID(),
      safraId: params.safraId,
      name: params.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}

export namespace Plantation {
  export interface Props {
    id: string
    safraId: string
    name: string
    createdAt: Date
    updatedAt: Date
  }

  export interface Params {
    id: string
    safraId: string
    name: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export interface CreateParams {
    safraId: string
    name: string
  }
}
