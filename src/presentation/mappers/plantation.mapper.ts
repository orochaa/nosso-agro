import type { Plantation } from '#domain/entities/plantation.js'
import { ApiProperty } from '@nestjs/swagger'

export class PlantationSampleDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  createdAt: string
}

export class PlantationDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  createdAt: string
  @ApiProperty()
  updatedAt: string
}

export const PlantationMapper = {
  toSampleDto(data: Plantation): PlantationSampleDto {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt.toISOString(),
    }
  },
  mapToSampleDto(data: Plantation[]): PlantationSampleDto[] {
    return data.map(d => PlantationMapper.toSampleDto(d))
  },
  toDto(data: Plantation): PlantationDto {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    }
  },
}
