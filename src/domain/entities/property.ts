import { BadRequestException } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

export class Property {
  private readonly props: Property.Props

  constructor(params: Property.Params) {
    Property.validateParams(params)

    this.props = {
      id: params.id,
      producerId: params.producerId,
      name: params.name,
      city: params.city,
      state: params.state,
      totalArea: params.totalArea,
      arableArea: params.arableArea,
      vegetationArea: params.vegetationArea,
      createdAt: new Date(params.createdAt),
      updatedAt: new Date(params.updatedAt),
    }
  }

  private static validateParams(params: Property.Params): void {
    if (!params.id) {
      throw new BadRequestException('Campo id é obrigatório')
    }

    if (!params.producerId) {
      throw new BadRequestException('Campo producerId é obrigatório')
    }

    if (!params.name) {
      throw new BadRequestException('Campo nome é obrigatório')
    }

    if (!params.city) {
      throw new BadRequestException('Campo cidade é obrigatório')
    }

    if (!params.state) {
      throw new BadRequestException('Campo estado é obrigatório')
    }

    if (!params.totalArea) {
      throw new BadRequestException('Campo área total é obrigatório')
    }

    if (!params.arableArea) {
      throw new BadRequestException('Campo área arável é obrigatório')
    }

    if (!params.vegetationArea) {
      throw new BadRequestException('Campo área de vegetação é obrigatório')
    }

    if (params.arableArea + params.vegetationArea > params.totalArea) {
      throw new BadRequestException(
        'A soma da área arável e da área de vegetação não pode ser maior que a área total'
      )
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

  get producerId(): string {
    return this.props.producerId
  }

  set producerId(producerId: string) {
    if (!producerId) {
      throw new BadRequestException('Campo producerId é obrigatório')
    }
    this.props.producerId = producerId
    this.update()
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

  get city(): string {
    return this.props.city
  }

  set city(city: string) {
    if (!city) {
      throw new BadRequestException('Campo cidade é obrigatório')
    }
    this.props.city = city
    this.update()
  }

  get state(): string {
    return this.props.state
  }

  set state(state: string) {
    if (!state) {
      throw new BadRequestException('Campo estado é obrigatório')
    }
    this.props.state = state
    this.update()
  }

  get totalArea(): number {
    return this.props.totalArea
  }

  set totalArea(totalArea: number) {
    if (!totalArea) {
      throw new BadRequestException('Campo área total é obrigatório')
    }

    this.props.totalArea = totalArea
    this.update()
  }

  get arableArea(): number {
    return this.props.arableArea
  }

  set arableArea(arableArea: number) {
    if (!arableArea) {
      throw new BadRequestException('Campo área arável é obrigatório')
    }

    this.props.arableArea = arableArea
    this.update()
  }

  get vegetationArea(): number {
    return this.props.vegetationArea
  }

  set vegetationArea(vegetationArea: number) {
    if (!vegetationArea) {
      throw new BadRequestException('Campo área de vegetação é obrigatório')
    }
    this.props.vegetationArea = vegetationArea
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

  static create(params: Property.CreateParams): Property {
    return new Property({
      id: randomUUID(),
      producerId: params.producerId,
      name: params.name,
      city: params.city,
      state: params.state,
      totalArea: params.totalArea,
      arableArea: params.arableArea,
      vegetationArea: params.vegetationArea,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}

export namespace Property {
  export interface Props {
    id: string
    producerId: string
    name: string
    city: string
    state: string
    totalArea: number
    arableArea: number
    vegetationArea: number
    createdAt: Date
    updatedAt: Date
  }

  export interface Params {
    id: string
    producerId: string
    name: string
    city: string
    state: string
    totalArea: number
    arableArea: number
    vegetationArea: number
    createdAt: Date | string
    updatedAt: Date | string
  }

  export interface CreateParams {
    producerId: string
    name: string
    city: string
    state: string
    totalArea: number
    arableArea: number
    vegetationArea: number
  }
}
