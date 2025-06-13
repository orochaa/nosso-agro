import type { Safra } from '#domain/entities/safra.js'
import { ApiProperty } from '@nestjs/swagger'

export class SafraSampleDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  createdAt: string
}

export class SafraDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  createdAt: string
  @ApiProperty()
  updatedAt: string
}

export const SafraMapper = {
  toSampleDto(data: Safra): SafraSampleDto {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt.toISOString(),
    }
  },
  mapToSampleDto(data: Safra[]): SafraSampleDto[] {
    return data.map(d => SafraMapper.toSampleDto(d))
  },
  toDto(data: Safra): SafraDto {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    }
  },
}
