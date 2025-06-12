import type { Producer } from '#domain/entities/producer.js'
import { ApiProperty } from '@nestjs/swagger'

export class ProducerSampleDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  firstName: string
  @ApiProperty()
  lastName: string
  @ApiProperty()
  createdAt: string
}

export class ProducerDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  firstName: string
  @ApiProperty()
  lastName: string
  @ApiProperty()
  email: string
  @ApiProperty()
  document: string
  @ApiProperty()
  createdAt: string
  @ApiProperty()
  updatedAt: string
}

export const ProducerMapper = {
  toSampleDto(data: Producer): ProducerSampleDto {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: data.createdAt.toISOString(),
    }
  },
  mapToSampleDto(data: Producer[]): ProducerSampleDto[] {
    return data.map(d => ProducerMapper.toSampleDto(d))
  },
  toDto(data: Producer): ProducerDto {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      document: data.document,
      email: data.email,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    }
  },
}
